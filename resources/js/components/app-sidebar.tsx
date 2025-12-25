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
import admin from '@/routes/admin';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Settings,
    ShoppingCart,
    Star,
    Tag,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard.url(),
        icon: LayoutGrid,
    },
    {
        title: 'Courses',
        href: admin.courses.index.url(),
        icon: BookOpen,
    },
    {
        title: 'Users',
        href: admin.users.index.url(),
        icon: Users,
    },
    {
        title: 'Orders',
        href: admin.orders.index.url(),
        icon: ShoppingCart,
    },
    {
        title: 'Coupons',
        href: admin.coupons.index.url(),
        icon: Tag,
    },
    {
        title: 'Reviews',
        href: admin.reviews.index.url(),
        icon: Star,
    },
    {
        title: 'Settings',
        href: admin.settings.index.url(),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard.url()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
