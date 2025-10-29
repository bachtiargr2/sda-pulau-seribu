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
import kelolaData from '@/routes/kelola-data';
import pulau from '@/routes/pulau';

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
                href: kelolaData.pantai(),
            },
            {
                title: 'Limbah',
                href: '#',
            },
            {
                title: 'Air',
                href: '#',
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
                href: '#',
            },
        ]
    },
    {
        title: 'Unit Kerja',
        href: '#',
        icon: BriefcaseBusiness,
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
