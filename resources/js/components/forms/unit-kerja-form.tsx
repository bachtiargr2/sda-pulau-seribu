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
import { updateData } from "@/utils/update"

type UnitKerjaFormProps = {
  initialData?: { id?: number; nama?: string; deskripsi?: string }
  onSuccess?: () => void
  submitRoute: string
  method?: "post" | "put"
}

export default function UnitKerjaForm({
  initialData,
  onSuccess,
  submitRoute,
  method = "post",
}: UnitKerjaFormProps) {
  const [isPending, startTransition] = useTransition()
  const { data, setData, errors, reset, setError } = useForm({
    nama: initialData?.nama ?? "",
  })

  const handleChange = (field: keyof typeof data, value: string) => {
    setData(field, value)
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
          label: "Unit Kerja",
          onSuccess,
        })
      } else {
        createData({
          url: "/master-data/unit-kerja",
          data,
          label: "Unit Kerja",
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
          <Label className={errors.nama && "text-red-500"}>
            Nama Unit Kerja<span className="text-red-500">*</span>
          </Label>
          <Input
            value={data.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            placeholder="Masukkan nama unit kerja"
            className={errors.nama && "border-red-500 placeholder:text-red-500"}
          />
          {errors.nama && <InputError message={errors.nama} />}
        </div>
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
