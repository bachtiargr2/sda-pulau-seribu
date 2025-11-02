import { DocumentChart } from '@/components/dashboard/dokumen-chart';
import { StatCard } from '@/components/dashboard/stat-card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { pulau, data_pantai, data_air_bersih, data_limbah, dokumen_data } = usePage<{
        pulau: any;
        data_pantai: any;
        data_air_bersih: any;
        data_limbah: any;
        dokumen_data: any;
    }>().props

    const [pulauFilter, setPulauFilter] = useState("");

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola data pantai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative h-64 overflow-hidden rounded-xl border border-sidebar-border/70">
                    <img src="banner.jpg" alt="" className="h-full w-full object-cover object-center" />
                </div>
                <div className="mb-6">
                    <span>Pulau: </span>
                    <div className="inline-block bg-white rounded px-4 py-2 min-w-[200px] relative">
                        <select
                            className="w-full border rounded-md p-2"
                            value={pulauFilter}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPulauFilter(value);
                                router.get(`/dashboard`, { pulau_id: value }, { preserveState: true });
                            }}
                        >
                            <option value="">Pilih Pulau</option>
                            {pulau.map((p: any) => (
                                <option key={p.id} value={p.id}>{p.nama}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard
                    title="Jumlah Dokumen Pantai"
                    value={data_pantai}
                    icon={
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="10" y="60" width="30" height="30" fill="#3b82f6" rx="2" />
                        <rect x="20" y="50" width="30" height="40" fill="#60a5fa" rx="2" />
                        <rect x="35" y="40" width="30" height="50" fill="#93c5fd" rx="2" />
                        <path d="M 75 35 Q 85 35 85 45 L 85 85 Q 85 90 80 90 L 50 90 Q 45 90 45 85 L 45 45 Q 45 35 55 35 Z" fill="#dbeafe" />
                        <circle cx="65" cy="50" r="8" fill="#1d4ed8" />
                        <rect x="52" y="65" width="8" height="20" fill="#1d4ed8" />
                        <rect x="65" y="70" width="8" height="15" fill="#1d4ed8" />
                        <rect x="78" y="75" width="8" height="10" fill="#1d4ed8" />
                        </svg>
                    }
                    />
                    <StatCard
                    title="Jumlah Dokumen Air Bersih"
                    value={data_air_bersih}
                    icon={
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="35" y="20" width="30" height="60" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="2" />
                        <rect x="35" y="25" width="30" height="35" fill="#7dd3fc" />
                        <circle cx="50" cy="35" r="3" fill="#0284c7" opacity="0.6" />
                        <circle cx="45" cy="42" r="2" fill="#0284c7" opacity="0.6" />
                        <circle cx="55" cy="40" r="2.5" fill="#0284c7" opacity="0.6" />
                        <rect x="32" y="15" width="36" height="8" fill="#0ea5e9" rx="4" />
                        <path d="M 42 15 L 42 10 L 48 5 L 54 10 L 54 15" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                        <rect x="20" y="75" width="60" height="5" fill="#94a3b8" rx="2" />
                        <path d="M 25 80 Q 25 85 30 85 L 70 85 Q 75 85 75 80" fill="#cbd5e1" />
                        </svg>
                    }
                    />
                    <StatCard
                    title="Jumlah Dokumen Air Limbah"
                    value={data_limbah}
                    icon={
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                        <ellipse cx="50" cy="75" rx="35" ry="15" fill="#86efac" />
                        <rect x="30" y="40" width="15" height="40" fill="#4ade80" rx="2" />
                        <rect x="55" y="35" width="15" height="45" fill="#22c55e" rx="2" />
                        <ellipse cx="37.5" cy="40" rx="7.5" ry="3" fill="#86efac" />
                        <ellipse cx="62.5" cy="35" rx="7.5" ry="3" fill="#86efac" />
                        <path d="M 15 55 L 25 45 L 35 55" fill="none" stroke="#16a34a" strokeWidth="2" />
                        <path d="M 70 50 L 80 40 L 90 50" fill="none" stroke="#16a34a" strokeWidth="2" />
                        <circle cx="20" cy="30" r="4" fill="#4ade80" />
                        <circle cx="85" cy="25" r="3" fill="#4ade80" />
                        <rect x="20" y="75" width="8" height="15" fill="#059669" rx="1" />
                        <rect x="42" y="75" width="6" height="12" fill="#059669" rx="1" />
                        <rect x="60" y="75" width="7" height="18" fill="#059669" rx="1" />
                        <rect x="75" y="75" width="8" height="10" fill="#059669" rx="1" />
                        </svg>
                    }
                    />
                </div>
                <DocumentChart data={dokumen_data} />
            </div>
        </AppLayout>
    );
}
