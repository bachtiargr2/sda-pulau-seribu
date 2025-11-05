import { DataAnggaran } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UpdateDataPantaiSheet } from '@/components/toolbar/update-data-pantai-sheet'
import { DeleteDialog } from '@/components/toolbar/delete-dialog'
import { useState } from 'react'
import StatusColumn from '@/components/status-column'
import { DownloadDialog } from '@/components/toolbar/download-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const columns = (pulauOptions: any, jenisDataOptions:any, statusOptions:any) => {
    const cols: ColumnDef<DataAnggaran>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorFn: row => row.pulau?.nama ?? '-', header: 'Pulau' },
    { accessorFn: row => row.jenis_data?.nama ?? '-', header: 'Jenis Data' },
    { accessorKey: 'tahun', header: 'Tahun' },
    {
        accessorKey: 'dokumen_nama',
        header: 'Nama Dokumen',
        cell: ({ row }) => (
            <div className="max-w-52 whitespace-normal break-words">
                {row.getValue('dokumen_nama')}
            </div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusColumn status={row.original?.status} />
    },
    // {
    //     accessorKey: 'created_at',
    //     header: 'Tanggal Upload',
    //     cell: ({ row }) => {
    //         if (!row.original.created_at) return '-'
    //         const date = new Date(row.original.created_at)
    //         return date.toLocaleDateString('id-ID', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         })
    //     },
    // },
    {
        id: 'actions',
        cell: ({ row }) => {
            const [showDownload, setShowDownload] = useState(false)
            const [showUpdateSheet, setShowUpdateSheet] = useState(false)
            const [showDelete, setShowDelete] = useState(false)

            return (
                <>
                    <DownloadDialog
                        open={showDownload}
                        onOpenChange={setShowDownload}
                        nama={row.original?.dokumen_nama}
                        path={row.original?.dokumen_path}
                    />
                    <UpdateDataPantaiSheet
                        open={showUpdateSheet}
                        onOpenChange={setShowUpdateSheet}
                        pulauOptions={pulauOptions}
                        jenisDataOptions={jenisDataOptions}
                        statusOptions={statusOptions}
                        data={row.original}
                    />
                    <DeleteDialog
                        open={showDelete}
                        onOpenChange={setShowDelete}
                        items={row.original.id}
                        url="/kelola-data/pantai"
                        label={row.original.dokumen_nama || 'Data Pantai'}
                        onSuccess={() => row.toggleSelected(false)}
                        showTrigger={false}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setShowDownload(true) }}>
                                Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setShowUpdateSheet(true) }}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setShowDelete(true) }}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]
return cols
}
