import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useMemo, useTransition } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { LoaderIcon } from "lucide-react"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import InputError from "../input-error"
import { toast } from "sonner"
import { updateData } from "@/utils/update"
import { createData } from "@/utils/create"

type PulauFormProps = {
  initialData?: {
    id?: number
    nama?: string
    kecamatan?: string
    kelurahan?: string
  }
  onSuccess?: () => void
  submitRoute: string
  method?: "post" | "put"
}

const kecamatanOptions = ["Kepulauan Seribu Utara", "Kepulauan Seribu Selatan"]

const kelurahanOptions = {
  "Kepulauan Seribu Utara": ["Pulau Harapan", "Pulau Kelapa", "Pulau Panggang"],
  "Kepulauan Seribu Selatan": ["Pulau Pari", "Pulau Tidung", "Pulau Untung Jawa"],
} as const

export default function PulauForm({
  initialData,
  onSuccess,
  submitRoute,
  method = "post",
}: PulauFormProps) {
  const [isPending, startTransition] = useTransition()

  const { data, setData, post, processing, errors, reset, setError } = useForm({
    nama: initialData?.nama ?? "",
    kecamatan: initialData?.kecamatan ?? "",
    kelurahan: initialData?.kelurahan ?? "",
  })

  const filteredKelurahan = useMemo(() => {
    return kelurahanOptions[data.kecamatan as keyof typeof kelurahanOptions] || []
  }, [data.kecamatan])

  const handleChange = (field: keyof typeof data, value: string) => {
    if (field === "kecamatan") {
      setData({
        ...data,
        kecamatan: value,
        kelurahan: "",
      })
    } else {
      setData(field, value)
    }
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
        <div>
          <Label className={errors.nama && "text-red-500"}>
            Nama Pulau<span className="text-red-500">*</span>
          </Label>
          <Input
            value={data.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            placeholder="Input nama pulau"
            className={errors.nama && "border-red-500 placeholder:text-red-500"}
          />
          {errors.nama && <InputError message={errors.nama} />}
        </div>

        <div>
          <Label>Kecamatan</Label>
          <Select onValueChange={(value) => handleChange("kecamatan", value)} value={data.kecamatan}>
            <SelectTrigger>
              <SelectValue placeholder="Select kecamatan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {kecamatanOptions.map((kecamatan) => (
                  <SelectItem key={kecamatan} value={kecamatan}>
                    {kecamatan}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Kelurahan</Label>
          <Select
            disabled={!data.kecamatan}
            onValueChange={(value) => handleChange("kelurahan", value)}
            value={data.kelurahan}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select kelurahan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filteredKelurahan.map((kelurahan) => (
                  <SelectItem key={kelurahan} value={kelurahan}>
                    {kelurahan}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

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
