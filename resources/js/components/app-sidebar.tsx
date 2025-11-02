import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ClipboardList, Database, User, BriefcaseBusiness } from 'lucide-react';
import AppLogo from './app-logo';
import pantai from '@/routes/kelola-data/pantai';
import limbah from '@/routes/kelola-data/limbah';
import air from '@/routes/kelola-data/air';
import pulau from '@/routes/pulau';
import jenisData from '@/routes/jenis-data';
import unitKerja from '@/routes/unit-kerja';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Kelola Data',
        href: '/kelola-data',
        icon: ClipboardList,
        subItems: [
            {
                title: 'Pantai',
                href: pantai.index(),
            },
            {
                title: 'Air Bersih',
                href: air.index(),
            },
            {
                title: 'Limbah',
                href: limbah.index(),
            },
        ]
    },
    {
        title: 'Master Data',
        href: '/master-data',
        icon: Database,
        subItems: [
            {
                title: 'Pulau',
                href: pulau.index(),
            },
            {
                title: 'Jenis Data',
                href: jenisData.index(),
            },
            {
                title: 'Unit Kerja',
                href: unitKerja.index(),
            },
        ]
    },
    {
        title: 'User',
        href: '#',
        icon: User,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="xl" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter> */}
        </Sidebar>
    );
}
