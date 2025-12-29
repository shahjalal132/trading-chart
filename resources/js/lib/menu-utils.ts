import { type NavItem } from '@/types';
import {
    BarChart,
    BookOpen,
    CreditCard,
    GraduationCap,
    LayoutDashboard,
    Settings,
    Users,
} from 'lucide-react';
import menuItemsData from '@/data/menuItems.json';

// Icon mapping for menu items
const iconMap: Record<string, typeof LayoutDashboard> = {
    'layout-dashboard': LayoutDashboard,
    'users': Users,
    'book-open': BookOpen,
    'graduation-cap': GraduationCap,
    'credit-card': CreditCard,
    'bar-chart': BarChart,
    'settings': Settings,
};

interface MenuItemData {
    label: string;
    icon?: string;
    route?: string;
    children?: Array<{ label: string; route: string }>;
}

/**
 * Convert menuItems.json data to NavItem format
 */
export function convertMenuItemsToNavItems(): NavItem[] {
    const menuItems = menuItemsData as Record<string, MenuItemData>;

    return Object.entries(menuItems).map(([key, item]) => {
        const navItem: NavItem = {
            title: key,
            label: item.label,
            route: item.route,
            icon: item.icon ? iconMap[item.icon] : undefined,
        };

        if (item.children && item.children.length > 0) {
            navItem.children = item.children.map((child) => ({
                label: child.label,
                route: child.route,
            }));
        }

        return navItem;
    });
}

