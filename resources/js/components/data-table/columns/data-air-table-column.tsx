import { DataAnggaran } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UpdateDataAirSheet } from '@/components/toolbar/update-data-air-sheet'
import { DeleteDialog } from '@/components/toolbar/delete-data-air-dialog'
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
    accessorKey: 'tanggal_upload',
    header: 'Tanggal Upload',
    cell: ({ row }) => {
      if (!row.original.tanggal_upload) return '-'
      const date = new Date(row.original.tanggal_upload)
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
      const [showUpdate, setShowUpdate] = useState(false)
      const [showDelete, setShowDelete] = useState(false)

      return (
        <>
          <UpdateDataAirSheet
            open={showUpdate}
            onOpenChange={setShowUpdate}
            data={row.original}
          />
          <DeleteDialog
            open={showDelete}
            onOpenChange={setShowDelete}
            data={row.original.id}
            url="/data-air"
            label={row.original.dokumen_nama || 'Data Air'}
            onSuccess={() => row.toggleSelected(false)}
            showTrigger={false}
          />
          <Button variant="ghost" onClick={() => { setShowUpdate(true) }}>
            <MoreHorizontal />
          </Button>
        </>
      )
    },
  },
]
