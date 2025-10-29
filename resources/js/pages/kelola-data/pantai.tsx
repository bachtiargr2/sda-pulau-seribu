import { DataTable } from '@/components/data-table/app-table';
import { columns } from '@/components/data-table/columns/pantai-table-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import kelolaData from '@/routes/kelola-data';
import { type Pantai, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Data Pantai',
        href: kelolaData.pantai().url,
    },
];

export default function Pantai() {
    const data: Pantai[] = [
        { id: 1,pulau: {id: 1, name: "Pulau Harapan"}, tahun_anggaran: 2025, jenis_data: { id: 1, name: "Kajian" }, dokumen_file: "Kajian Revitalisasi", status: 1 },
        { id: 2,pulau: {id: 2, name: "Pulau Pari"}, tahun_anggaran: 2025, jenis_data: { id: 2, name: "DED" }, dokumen_file: "DED Pembangunan", status: 2 },
        { id: 3,pulau: {id: 3, name: "Pulau Tidung"}, tahun_anggaran: 2025, jenis_data: { id: 3, name: "RAB"}, dokumen_file: "RAB Konservasi Pantai", status: 3 },
        { id: 1,pulau: {id: 1, name: "Pulau Harapan"}, tahun_anggaran: 2024, jenis_data: { id: 1, name: "Kajian" }, dokumen_file: "Kajian Revitalisasi", status: 1 },
        { id: 2,pulau: {id: 2, name: "Pulau Pari"}, tahun_anggaran: 2025, jenis_data: { id: 2, name: "DED" }, dokumen_file: "DED Pembangunan", status: 1 },
        { id: 3,pulau: {id: 3, name: "Pulau Tidung"}, tahun_anggaran: 2025, jenis_data: { id: 3, name: "RAB"}, dokumen_file: "RAB Konservasi Pantai", status: 1 },
        { id: 1,pulau: {id: 1, name: "Pulau Harapan"}, tahun_anggaran: 2025, jenis_data: { id: 1, name: "Kajian" }, dokumen_file: "Kajian Revitalisasi", status: 1 },
        { id: 2,pulau: {id: 2, name: "Pulau Pari"}, tahun_anggaran: 2025, jenis_data: { id: 2, name: "DED" }, dokumen_file: "DED Pembangunan", status: 1 },
        { id: 3,pulau: {id: 3, name: "Pulau Tidung"}, tahun_anggaran: 2025, jenis_data: { id: 3, name: "RAB"}, dokumen_file: "RAB Konservasi Pantai", status: 1 },
        { id: 1,pulau: {id: 1, name: "Pulau Harapan"}, tahun_anggaran: 2025, jenis_data: { id: 1, name: "Kajian" }, dokumen_file: "Kajian Revitalisasi", status: 1 },
        { id: 2,pulau: {id: 2, name: "Pulau Pari"}, tahun_anggaran: 2025, jenis_data: { id: 2, name: "DED" }, dokumen_file: "DED Pembangunan", status: 1 },
        { id: 3,pulau: {id: 3, name: "Pulau Tidung"}, tahun_anggaran: 2025, jenis_data: { id: 3, name: "RAB"}, dokumen_file: "RAB Konservasi Pantai", status: 1 },
        { id: 1,pulau: {id: 1, name: "Pulau Harapan"}, tahun_anggaran: 2025, jenis_data: { id: 1, name: "Kajian" }, dokumen_file: "Kajian Revitalisasi", status: 1 },
        { id: 2,pulau: {id: 2, name: "Pulau Pari"}, tahun_anggaran: 2025, jenis_data: { id: 2, name: "DED" }, dokumen_file: "DED Pembangunan", status: 1 },
        { id: 3,pulau: {id: 3, name: "Pulau Tidung"}, tahun_anggaran: 2025, jenis_data: { id: 3, name: "RAB"}, dokumen_file: "RAB Konservasi Pantai", status: 1 },
    ]

    return (
        <AppLayout>
            <Head title="Kelola Data Pantai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable columns={columns} data={data} />
            </div>
        </AppLayout>
    );
}
