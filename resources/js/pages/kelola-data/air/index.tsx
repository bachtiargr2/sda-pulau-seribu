import { DataTable } from '@/components/data-table/app-table'
import { columns } from '@/components/data-table/columns/data-air-table-column'
import AppLayout from '@/layouts/app-layout'
import dataAirRoutes from '@/routes/kelola-data/air'
import { type BreadcrumbItem, type DataAnggaran } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { TableToolbarActionsDataAir } from '@/components/toolbar/table-toolbar-actions-data-air'
import { useMemo } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Air Bersih',
        href: dataAirRoutes.index().url,
    },
]

export default function DataAirPage() {
    const { data_air, pulauOptions, jenisDataOptions, statusOptions } = usePage<{
        data_air?: DataAnggaran[];
        pulauOptions?: { id: number; nama: string }[];
        jenisDataOptions?: { id: number; nama: string }[];
        statusOptions?: { id: number; nama: string }[];
    }>().props;

    const safeData: DataAnggaran[] = Array.isArray(data_air) ? data_air : [];
    const safePulauOptions = Array.isArray(pulauOptions) ? pulauOptions : [];
    const safeJenisDataOptions = Array.isArray(jenisDataOptions) ? jenisDataOptions : [];
    const safeStatusOptions = Array.isArray(statusOptions) ? statusOptions : [];

    const tableColumns = useMemo(() => columns(pulauOptions, jenisDataOptions, statusOptions), [pulauOptions, jenisDataOptions, statusOptions])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Air Bersih" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    title="Data Air Bersih"
                    desc="Data anggaran khusus kategori Air"
                    columns={tableColumns}
                    data={safeData}
                    toolbar={
                        <TableToolbarActionsDataAir
                            pulauOptions={safePulauOptions}
                            jenisDataOptions={safeJenisDataOptions}
                            statusOptions={safeStatusOptions}
                        />
                    }
                />
            </div>
        </AppLayout>
    );
}
