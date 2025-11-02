import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useTransition } from "react"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { LoaderIcon } from "lucide-react"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import InputError from "../input-error"
import { createData } from "@/utils/create"
import { updateData } from "@/utils/update"

type PulauFormProps = {
  initialData?: {
    id?: number
    nama?: string
    longitude?: number | string
    latitude?: number | string
  }
  onSuccess?: () => void
  submitRoute: string
  method?: "post" | "put"
}

export default function PulauForm({
  initialData,
  onSuccess,
  submitRoute,
  method = "post",
}: PulauFormProps) {
  const [isPending, startTransition] = useTransition()

  const { data, setData, post, processing, errors, reset, setError } = useForm({
    nama: initialData?.nama ?? "",
    longitude: initialData?.longitude?.toString() ?? "",
    latitude: initialData?.latitude?.toString() ?? "",
  })

  const handleChange = (field: keyof typeof data, value: string) => {
    // Pastikan longitude & latitude selalu numeric (float) jika ada nilai
    if (field === "longitude" || field === "latitude") {
      const parsed = value === "" ? "" : parseFloat(value)
      setData(field, parsed)
    } else {
      setData(field, value)
    }

    // Hapus pesan error jika user mengetik ulang
    if (errors[field]) setError(field, "")
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    startTransition(() => {
      if (method === "put" && initialData?.id) {
        updateData({
          url: submitRoute,
          id: initialData.id,
          data,
          label: "Pulau",
          onSuccess: () => {
            onSuccess?.()
          },
        })
      } else {
        createData({
          url: "/master-data/pulau",
          data,
          label: "Pulau",
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
      <div className={cn("flex flex-col gap-4", method === "put" && "px-4")}>
        {/* Nama Pulau */}
        <div>
          <Label className={errors.nama && "text-red-500"}>
            Nama Pulau<span className="text-red-500">*</span>
          </Label>
          <Input
            value={data.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            placeholder="Masukkan nama pulau"
            className={errors.nama && "border-red-500 placeholder:text-red-500"}
          />
          {errors.nama && <InputError message={errors.nama} />}
        </div>

        {/* Longitude */}
        <div>
          <Label className={errors.longitude && "text-red-500"}>Longitude</Label>
          <Input
            type="number"
            step="any"
            value={data.longitude}
            onChange={(e) => handleChange("longitude", e.target.value)}
            placeholder="Contoh: 106.8451"
            className={errors.longitude && "border-red-500 placeholder:text-red-500"}
          />
          {errors.longitude && <InputError message={errors.longitude} />}
        </div>

        {/* Latitude */}
        <div>
          <Label className={errors.latitude && "text-red-500"}>Latitude</Label>
          <Input
            type="number"
            step="any"
            value={data.latitude}
            onChange={(e) => handleChange("latitude", e.target.value)}
            placeholder="Contoh: -6.2088"
            className={errors.latitude && "border-red-500 placeholder:text-red-500"}
          />
          {errors.latitude && <InputError message={errors.latitude} />}
        </div>
      </div>

      {/* Footer Buttons */}
      {method === "post" ? (
        <DialogFooter className="gap-2 pt-2 sm:space-x-0">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending}>
            {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />}
            Create
          </Button>
        </DialogFooter>
      ) : (
        <SheetFooter className="gap-2 pt-2 sm:space-x-0">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button disabled={isPending}>
            {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />}
            Save
          </Button>
        </SheetFooter>
      )}
    </form>
  )
}
