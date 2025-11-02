import { Pulau } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UpdatePulauSheet } from '@/components/toolbar/update-pulau-sheet'
import { useState } from 'react'
import { DeleteDialog } from '@/components/toolbar/delete-pulau-dialog'
import { Checkbox } from '@/components/ui/checkbox'

// Helper untuk format koordinat agar aman dari error dan tampil rapi
const formatCoordinate = (value: any) => {
  const num = parseFloat(value)
  return !isNaN(num) ? num.toFixed(6) : '-'
}

export const columns: ColumnDef<Pulau>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
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
  {
    accessorKey: 'nama',
    header: 'Nama Pulau',
  },
  {
    accessorKey: 'longitude',
    header: 'Longitude',
    cell: ({ getValue }) => formatCoordinate(getValue()),
  },
  {
    accessorKey: 'latitude',
    header: 'Latitude',
    cell: ({ getValue }) => formatCoordinate(getValue()),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [showUpdateTaskSheet, setShowUpdateTaskSheet] = useState(false)
      const [showDeleteDialog, setShowDeleteDialog] = useState(false)

      return (
        <>
          <UpdatePulauSheet
            open={showUpdateTaskSheet}
            onOpenChange={setShowUpdateTaskSheet}
            data={row.original}
          />
          <DeleteDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            data={row.original.id}
            url="/master-data/pulau"
            label={row.original.nama}
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
              <DropdownMenuItem>View Detail</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]