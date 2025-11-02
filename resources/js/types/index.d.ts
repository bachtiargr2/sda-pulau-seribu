import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    subItems?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Pantai {
    id: number;
    pulau: {
        id: number;
        name: string;
    }
    jenis_data: {
        id: number;
        name: string;
    }
    tahun_anggaran: number;
    dokumen_file: string;
    status: number;
}

export interface Status {
    status: number | any;
}

export interface Pulau {
    id: number;
    nama: string;
    kelurahan: string;
    kecamatan: string;
}

export type JenisData = {
  id: number
  nama: string
  deskripsi?: string
  created_at?: string
  updated_at?: string
}

export interface UnitKerja {
    id: number;
    nama: string;
}

export type DataAnggaran = {
  id: number
  id_pulau: number
  pulau: {
    id: number
    nama: string
  }
  id_jenis_data: number
  jenisData: {
    id: number
    nama: string
  }
  id_kategori: number
  tahun: number
  dokumen_path?: string
  dokumen_nama?: string
  tanggal_upload?: string
  status?: number
  statusData?: {
    id: number
    nama: string
  }
  created_at?: string
  updated_at?: string
  tanggal_upload?: string
}

