import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import PulauForm from "../forms/pulau-form"
import { ComponentPropsWithRef } from "react"

interface UpdatePulauSheetProps extends ComponentPropsWithRef<typeof Sheet> {
  data: {
    id: number
    nama: string
    kecamatan: string
    kelurahan: string
  }
  onClose?: () => void
}

export function UpdatePulauSheet({
  data,
  onClose,
  ...props
}: UpdatePulauSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Pulau</SheetTitle>
          <SheetDescription>
            Perbarui data pulau dan simpan perubahan.
          </SheetDescription>
        </SheetHeader>

        <PulauForm
          initialData={data}
          method="put"
          submitRoute="/master-data/pulau"
          onSuccess={() => {
            props.onOpenChange?.(false)
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
