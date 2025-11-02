import { DataTable } from '@/components/data-table/app-table'
import { columns } from '@/components/data-table/columns/jenis-data-table-column'
import AppLayout from '@/layouts/app-layout'
import jenisData from '@/routes/jenis-data'
import { type BreadcrumbItem, type JenisData } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { TableToolbarActionsJenisData } from '@/components/toolbar/table-toolbar-actions-jenis-data'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Master Jenis Data',
    href: jenisData.index().url,
  },
]

export default function JenisDataPage() {
  const { jenis_data } = usePage<{ jenis_data?: JenisData[] }>().props
  const safeData: JenisData[] = Array.isArray(jenis_data) ? jenis_data : []

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Master Jenis Data" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <DataTable
          title="Jenis Data"
          desc="Master data jenis data"
          columns={columns}
          data={safeData}
          toolbar={<TableToolbarActionsJenisData />}
        />
      </div>
    </AppLayout>
  )
}
