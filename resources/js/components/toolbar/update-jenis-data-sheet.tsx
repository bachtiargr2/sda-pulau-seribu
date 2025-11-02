import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import JenisDataForm from "../forms/jenis-data-form"
import { ComponentPropsWithRef } from "react"

interface UpdateJenisDataSheetProps extends ComponentPropsWithRef<typeof Sheet> {
  data: { id: number; nama: string; deskripsi?: string }
}

export function UpdateJenisDataSheet({ data, ...props }: UpdateJenisDataSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Jenis Data</SheetTitle>
          <SheetDescription>Perbarui data jenis data dan simpan perubahan.</SheetDescription>
        </SheetHeader>

        <JenisDataForm
          initialData={data}
          method="put"
          submitRoute={`/master-data/jenis-data`}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
