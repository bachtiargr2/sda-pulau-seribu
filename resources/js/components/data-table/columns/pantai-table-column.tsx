import { Pantai } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import StatusColumn from '@/components/status-column';

export const columns: ColumnDef<Pantai>[] = [
    {
        accessorKey: "pulau.name",
        header: "Pulau",
        cell: ({row}) => row.original.pulau?.name ?? "-",
    },
    {
        accessorKey: "tahun_anggaran",
        header: "Tahun Anggaran",
    },
    {
        accessorKey: "jenis_data.name",
        header: "Jenis Data",
        cell: ({row}) => row.original.jenis_data?.name ?? "-",
    },
    {
        accessorKey: "dokumen_file",
        header: "Dokumen File",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusColumn status={row.original.status} />
    },
    {
        id: "actions",
        cell: ({row}) => {
            const pantai = row.original

            return (
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
                        <DropdownMenuItem>
                            View Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
