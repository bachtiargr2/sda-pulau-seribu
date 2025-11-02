import { DataTable } from '@/components/data-table/app-table';
import { columns } from '@/components/data-table/columns/pulau-table-column';
import AppLayout from '@/layouts/app-layout';
import pulau from '@/routes/pulau';
import { type BreadcrumbItem, type Pulau } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { TableToolbarActionsPulau } from '@/components/toolbar/table-toolbar-actions-pulau'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data Pulau',
        href: pulau.index().url,
    },
];

export default function Pulau() {
    const { pulau } = usePage<{ pulau: Pulau[] }>().props

    return (
        <AppLayout>
            <Head title="Master Data Pulau" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable title="Pulau" desc="Master data pulau" columns={columns} data={pulau} toolbar={<TableToolbarActionsPulau />} />
            </div>
        </AppLayout>
    );
}
