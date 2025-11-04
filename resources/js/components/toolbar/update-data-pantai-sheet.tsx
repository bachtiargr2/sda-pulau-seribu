import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import DataPantaiForm from "../forms/data-pantai-form"
import { ComponentPropsWithRef } from "react"
import { DataAnggaran } from "@/types"

interface UpdateDataPantaiSheetProps extends ComponentPropsWithRef<typeof Sheet> {
    data: DataAnggaran
    pulauOptions: { id: number; nama: string }[]
    jenisDataOptions: { id: number; nama: string }[]
    statusOptions: { id: number; nama: string }[]
}

export function UpdateDataPantaiSheet({ data, pulauOptions = [],
    jenisDataOptions = [],
    statusOptions = [],
    ...props }: UpdateDataPantaiSheetProps) {
    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Update Data Pantai</SheetTitle>
                    <SheetDescription>Perbarui data jenis data dan simpan perubahan.</SheetDescription>
                </SheetHeader>

                <DataPantaiForm
                    initialData={data}
                    pulauOptions={pulauOptions}       // default kosong
                    jenisDataOptions={jenisDataOptions}   // default kosong
                    statusOptions={statusOptions}   // default kosong
                    method="put"
                    submitRoute={`/kelola-data/pantai`}
                    onSuccess={() => props.onOpenChange?.(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
