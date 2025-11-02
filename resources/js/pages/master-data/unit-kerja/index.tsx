import { DataTable } from '@/components/data-table/app-table';
import { columns } from '@/components/data-table/columns/unit-kerja-table-column';
import AppLayout from '@/layouts/app-layout';
import { type UnitKerja, type BreadcrumbItem, type Pulau } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { TableToolbarActionsPulau } from '@/components/toolbar/table-toolbar-actions-pulau'
import unitKerja from '@/routes/unit-kerja';
import { TableToolbarActionsUnitKerja } from '@/components/toolbar/table-toolbar-actions-unit-kerja';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data Unit Kerja',
        href: unitKerja.index().url,
    },
];

export default function UnitKerja() {
    const { unit_kerja } = usePage<{ unit_kerja?: UnitKerja[] }>().props

    return (
        <AppLayout>
            <Head title="Master Data Unit Kerja" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable title="Unit Kerja" desc="Master data unit kerja" columns={columns} data={unit_kerja} toolbar={<TableToolbarActionsUnitKerja />} />
            </div>
        </AppLayout>
    );
}
