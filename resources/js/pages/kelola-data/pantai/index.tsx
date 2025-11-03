import { DataTable } from '@/components/data-table/app-table'
import { columns } from '@/components/data-table/columns/data-pantai-table-column'
import AppLayout from '@/layouts/app-layout'
import dataPantaiRoutes from '@/routes/kelola-data/pantai'
import { type BreadcrumbItem, type DataAnggaran } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { TableToolbarActionsDataPantai } from '@/components/toolbar/table-toolbar-actions-data-pantai'
import { useMemo } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Data Pantai',
    href: dataPantaiRoutes.index().url,
  },
]

export default function DataPantaiPage() {
  const { data_pantai, pulauOptions, jenisDataOptions, statusOptions } = usePage<{
    data_pantai?: DataAnggaran[];
    pulauOptions?: { id: number; nama: string }[];
    jenisDataOptions?: { id: number; nama: string }[];
    statusOptions?: { id: number; nama: string }[];
  }>().props;
  const tableColumns = useMemo(() => columns(pulauOptions, jenisDataOptions, statusOptions), [pulauOptions, jenisDataOptions, statusOptions])

  const safeData: DataAnggaran[] = Array.isArray(data_pantai) ? data_pantai : [];
  const safePulauOptions = Array.isArray(pulauOptions) ? pulauOptions : [];
  const safeJenisDataOptions = Array.isArray(jenisDataOptions) ? jenisDataOptions : [];
  const safeStatusOptions = Array.isArray(statusOptions) ? statusOptions : [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Pantai" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <DataTable
          title="Data Pantai"
          desc="Data anggaran khusus kategori pantai"
          columns={tableColumns}
          data={safeData}
          toolbar={
            <TableToolbarActionsDataPantai
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
