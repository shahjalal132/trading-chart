import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const isItemActive = (item: NavItem): boolean => {
        const itemUrl = item.route || item.href;
        if (itemUrl && page.url.startsWith(resolveUrl(itemUrl))) {
            return true;
        }
        if (item.children) {
            return item.children.some((child) => isItemActive(child));
        }
        return false;
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isActive = isItemActive(item);
                    const itemKey = item.title || item.label || 'menu-item';
                    const itemLabel = item.label || item.title || '';

                    if (hasChildren) {
                        return (
                            <Collapsible
                                key={itemKey}
                                defaultOpen={isActive}
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={{ children: itemLabel }}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{itemLabel}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.children?.map((child, index) => {
                                                const childIsActive = page.url.startsWith(
                                                    resolveUrl(child.route || child.href || ''),
                                                );
                                                const childLabel = child.label || child.title || '';
                                                return (
                                                    <SidebarMenuSubItem key={`${itemKey}-child-${index}`}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={childIsActive}
                                                        >
                                                            <Link
                                                                href={child.route || child.href || '#'}
                                                                prefetch
                                                            >
                                                                <span>{childLabel}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    return (
                        <SidebarMenuItem key={itemKey}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: itemLabel }}
                            >
                                <Link href={item.route || item.href || '#'} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{itemLabel}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
