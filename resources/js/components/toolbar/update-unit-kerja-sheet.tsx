import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import PulauForm from "../forms/pulau-form"
import { ComponentPropsWithRef } from "react"
import UnitKerjaForm from "../forms/unit-kerja-form"

interface UpdateUnitKerjaSheetProps extends ComponentPropsWithRef<typeof Sheet> {
  data: {
    id: number
    nama: string
  }
  onClose?: () => void
}

export function UpdateUnitKerjaSheet({
  data,
  onClose,
  ...props
}: UpdateUnitKerjaSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Pulau</SheetTitle>
          <SheetDescription>
            Perbarui data pulau dan simpan perubahan.
          </SheetDescription>
        </SheetHeader>

        <UnitKerjaForm
          initialData={data}
          method="put"
          submitRoute="/master-data/unit-kerja"
          onSuccess={() => {
            props.onOpenChange?.(false)
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
