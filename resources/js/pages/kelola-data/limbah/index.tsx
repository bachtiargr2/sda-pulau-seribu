import { DataTable } from '@/components/data-table/app-table'
import { columns } from '@/components/data-table/columns/data-limbah-table-column'
import AppLayout from '@/layouts/app-layout'
import dataLimbahRoutes from '@/routes/kelola-data/limbah'
import { type BreadcrumbItem, type DataAnggaran } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { TableToolbarActionsDataLimbah } from '@/components/toolbar/table-toolbar-actions-data-limbah'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Data Limbah',
    href: dataLimbahRoutes.index().url,
  },
]

export default function DataLimbahPage() {
  const { data_limbah, pulauOptions, jenisDataOptions, statusOptions } = usePage<{
    data_limbah?: DataAnggaran[];
    pulauOptions?: { id: number; nama: string }[];
    jenisDataOptions?: { id: number; nama: string }[];
    statusOptions?: { id: number; nama: string }[];
  }>().props;

  const safeData: DataAnggaran[] = Array.isArray(data_limbah) ? data_limbah : [];
  const safePulauOptions = Array.isArray(pulauOptions) ? pulauOptions : [];
  const safeJenisDataOptions = Array.isArray(jenisDataOptions) ? jenisDataOptions : [];
  const safeStatusOptions = Array.isArray(statusOptions) ? statusOptions : [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Limbah" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <DataTable
          title="Data Limbah"
          desc="Data anggaran khusus kategori Limbah"
          columns={columns}
          data={safeData}
          toolbar={
            <TableToolbarActionsDataLimbah
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
