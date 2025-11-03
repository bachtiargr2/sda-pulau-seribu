import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useTransition } from "react"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { LoaderIcon } from "lucide-react"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import InputError from "../input-error"
import { createData } from "@/utils/create"
import { YearPicker } from "../year-picker"
import { updateDataWithFile } from "@/utils/update-with-file"

type DataPantaiFormProps = {
  pulauOptions: { id: number; nama: string }[]
  jenisDataOptions: { id: number; nama: string }[]
  statusOptions: { id: number; nama: string }[]
  initialData?: any
  onSuccess?: () => void
  submitRoute: string
  method?: "post" | "put"
}

export default function DataPantaiForm({
  pulauOptions,
  jenisDataOptions,
  statusOptions,
  initialData,
  onSuccess,
  submitRoute,
  method = "post",
}: DataPantaiFormProps) {
  const [isPending, startTransition] = useTransition()
  const { data, setData, errors, reset, setError } = useForm({
      id_pulau: initialData?.id_pulau ?? "",
      id_jenis_data: initialData?.id_jenis_data ?? "",
      tahun: initialData?.tahun ?? "",
      dokumen_nama: initialData?.dokumen_nama ?? "",
      dokumen_path: initialData?.dokumen_path ?? "",
      dokumen_url: initialData?.dokumen_url ?? "",
      dokumen: undefined,   // ← file object
      status: initialData?.status ?? "",
      _method: "PUT",
  })

  const handleChange = (field: keyof typeof data, value: any) => {
    setData(field, value)
    if (errors[field]) setError(field, "")
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    startTransition(() => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value)
      })

      if (method === "put" && initialData?.id) {
        updateDataWithFile({
          url: submitRoute,
          id: initialData.id,
          data: formData,
          label: "Data Pantai",
          onSuccess: () => {
            onSuccess?.()
          },
        })
      } else {
        createData({
          url: "/kelola-data/pantai",
          data: formData,
          label: "Data Pantai",
          onSuccess: () => {
            reset()
            onSuccess?.()
          },
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div>
          <Label>Nama Pulau</Label>
          <select
            className="w-full border rounded-md p-2"
            value={data.id_pulau}
            onChange={(e) => handleChange("id_pulau", e.target.value)}
          >
            <option value="">Pilih Pulau</option>
            {pulauOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.nama}</option>
            ))}
          </select>
          {errors.id_pulau && <InputError message={errors.id_pulau} />}
        </div>

        <div>
          <Label>Jenis Data</Label>
          <select
            className="w-full border rounded-md p-2"
            value={data.id_jenis_data}
            onChange={(e) => handleChange("id_jenis_data", e.target.value)}
          >
            <option value="">Pilih Jenis Data</option>
            {jenisDataOptions.map((j) => (
              <option key={j.id} value={j.id}>{j.nama}</option>
            ))}
          </select>
          {errors.id_jenis_data && <InputError message={errors.id_jenis_data} />}
        </div>

        <div className="flex flex-col gap-2">
          <Label>Tahun</Label>
            <YearPicker
                value={data.tahun}
                onChange={(year) => handleChange("tahun", year)}
                placeholder="Pilih tahun"
                minYear={1950}
                maxYear={new Date().getFullYear()}
            />
          {errors.tahun && <InputError message={errors.tahun} />}
        </div>

        <div>
          <Label>Upload Dokumen</Label>
          <input
            type="file"
            onChange={(e) => handleChange('dokumen', e.target.files?.[0])}
          />
          {errors.dokumen && <InputError message={errors.dokumen} />}
          {data.dokumen_url ? (
            <div className="text-sm text-gray-600">
                Current file:{" "}
                <a
                href={data.dokumen_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                >
                {data.dokumen_nama.split('/').pop()}
                </a>
            </div>
            ) : (
            <p className="text-sm text-gray-500">No file uploaded yet</p>
            )}
        </div>

        <div>
          <Label>Status</Label>
          <select
            className="w-full border rounded-md p-2"
            value={data.status ?? ""}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">Pilih Status</option>
            {statusOptions.map((s: { id: number; nama: string }) => (
              <option key={s.id} value={s.id}>{s.nama}</option>
            ))}
          </select>
          {errors.status && <InputError message={errors.status} />}
        </div>

        {/* <div>
          <Label>Nama Dokumen</Label>
          <Input
            value={data.dokumen_nama}
            onChange={(e) => handleChange("dokumen_nama", e.target.value)}
            placeholder="Nama dokumen"
          />
        </div> */}
      </div>

      {method === "post" ? (
        <DialogFooter className="gap-2 pt-2 sm:space-x-0">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending}>
            {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      ) : (
        <SheetFooter className="gap-2 pt-2 sm:space-x-0">
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </SheetClose>
          <Button disabled={isPending}>
            {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" />}
            Save
          </Button>
        </SheetFooter>
      )}
    </form>
  )
}
