import { DataAnggaran } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UpdateDataPantaiSheet } from '@/components/toolbar/update-data-pantai-sheet'
import { DeleteDialog } from '@/components/toolbar/delete-data-pantai-dialog'
import { useState } from 'react'
import StatusColumn from '@/components/status-column'

export const columns: ColumnDef<DataAnggaran>[] = [
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
  { accessorKey: 'dokumen_nama', header: 'Nama Dokumen' },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusColumn status={row.original?.status} />
    },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Upload',
    cell: ({ row }) => {
      if (!row.original.created_at) return '-'
      const date = new Date(row.original.created_at)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
        const [showUpdateTaskSheet, setShowUpdateTaskSheet] =useState(false)
      const [showDelete, setShowDelete] = useState(false)

      return (
        <>
            <UpdateDataPantaiSheet
                open={showUpdateTaskSheet}
                onOpenChange={setShowUpdateTaskSheet}
                data={row.original}
            />
          <DeleteDialog
            open={showDelete}
            onOpenChange={setShowDelete}
            data={row.original.id}
            url="/data-pantai"
            label={row.original.dokumen_nama || 'Data Pantai'}
            onSuccess={() => row.toggleSelected(false)}
            showTrigger={false}
          />
          <Button variant="ghost" onClick={() => { setShowUpdateTaskSheet(true) }}>
            <MoreHorizontal />
          </Button>
        </>
      )
    },
  },
]
