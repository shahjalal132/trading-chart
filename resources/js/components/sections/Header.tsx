import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import AppLogo from '../AppLogo';

interface NavItem {
    label: string;
    href: string;
    hasDropdown?: boolean;
}

const services: NavItem[] = [
    { label: 'Service 1', href: '#' },
    { label: 'Service 2', href: '#' },
    { label: 'Service 3', href: '#' },
];

const navigationItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Platforms', href: '/platforms' },
    { label: 'Contacts', href: '/contacts' },
];

export default function Header(): React.JSX.Element {
    return (
        <header className="flex w-full h-[95px] items-center justify-between bg-[var(--header-bg)] px-4 md:px-[220px]">
            <AppLogo src="/assets/images/logo.png" />

            <div className="flex items-center gap-[31px]">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList className="flex gap-[31px]">
                        {navigationItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                {item.hasDropdown ? (
                                    <>
                                        <NavigationMenuTrigger className="flex items-center gap-1 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] whitespace-nowrap text-white transition-opacity hover:opacity-80 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none p-0 h-auto [&>svg]:hidden [&[data-state=open]>svg:last-child]:rotate-180">
                                            {item.label}
                                            <ChevronDown className="h-[5px] w-[8.18px] ml-1 transition-transform duration-300" />
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-[var(--header-bg)] border-[var(--border-medium)]">
                                            <div className="flex flex-col gap-1 p-2 min-w-[160px]">
                                                {services.map((service, serviceIndex) => (
                                                    <NavigationMenuLink
                                                        key={serviceIndex}
                                                        href={service.href}
                                                        className="[font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] text-white transition-opacity hover:opacity-80 px-3 py-2 rounded-md hover:bg-white/10"
                                                    >
                                                        {service.label}
                                                    </NavigationMenuLink>
                                                ))}
                                            </div>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink
                                        href={item.href}
                                        className="flex items-center gap-1 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] whitespace-nowrap text-white transition-opacity hover:opacity-80"
                                    >
                                        {item.label}
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex gap-3.5">
                    <Button
                        className="h-[43px] w-[102px] rounded-2xl border border-solid border-[var(--border-medium)] [font-family:'Poppins-SemiBold',Helvetica] text-base leading-[26px] font-semibold tracking-[0] text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
                        style={{
                            background: `linear-gradient(180deg, var(--gradient-green-start) 0%, var(--gradient-green-end) 100%)`,
                        }}
                    >
                        Log In
                    </Button>
                    <Button
                        className="h-[43px] w-[116px] rounded-2xl border border-solid border-[var(--border-medium)] [font-family:'Poppins-SemiBold',Helvetica] text-base leading-[26px] font-semibold tracking-[0] text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
                        style={{
                            background: `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)`,
                        }}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
}
