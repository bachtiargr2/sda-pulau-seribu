import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import DataLimbahForm from "../forms/data-limbah-form"
import { ComponentPropsWithRef } from "react"
import { DataAnggaran } from "@/types"

interface UpdateDataLimbahSheetProps extends ComponentPropsWithRef<typeof Sheet> {
    data: DataAnggaran
    pulauOptions: { id: number; nama: string }[]
    jenisDataOptions: { id: number; nama: string }[]
    statusOptions: { id: number; nama: string }[]
}

export function UpdateDataLimbahSheet({ data,
    pulauOptions = [],
    jenisDataOptions = [],
    statusOptions = [],
    ...props }: UpdateDataLimbahSheetProps) {
    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Update Jenis Data</SheetTitle>
                    <SheetDescription>Perbarui data jenis data dan simpan perubahan.</SheetDescription>
                </SheetHeader>

                <DataLimbahForm
                    initialData={data}
                    pulauOptions={pulauOptions}       // default kosong
                    jenisDataOptions={jenisDataOptions}   // default kosong
                    statusOptions={statusOptions}   // default kosong
                    method="put"
                    submitRoute={`/kelola-data/limbah`}
                    onSuccess={() => props.onOpenChange?.(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
