import { JenisData } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UpdateJenisDataSheet } from '@/components/toolbar/update-jenis-data-sheet'
import { DeleteDialog } from '@/components/toolbar/delete-jenis-data-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

export const columns: ColumnDef<JenisData>[] = [
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
  { accessorKey: 'nama', header: 'Nama Jenis Data' },
  { accessorKey: 'deskripsi', header: 'Deskripsi' },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [showUpdate, setShowUpdate] = useState(false)
      const [showDelete, setShowDelete] = useState(false)

      return (
        <>
          <UpdateJenisDataSheet
            open={showUpdate}
            onOpenChange={setShowUpdate}
            data={row.original}
          />
          <DeleteDialog
            open={showDelete}
            onOpenChange={setShowDelete}
            data={row.original.id}
            url="/master-data/jenis-data"
            label={row.original.nama}
            onSuccess={() => row.toggleSelected(false)}
            showTrigger={false}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setShowUpdate(true)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowDelete(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]