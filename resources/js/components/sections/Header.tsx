import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import React, { useState } from 'react';
import AppLogo from '../AppLogo';
import GradientButton from '../GradientButton';

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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="flex w-full h-[95px] items-center justify-between bg-[var(--header-bg)] px-4 md:px-[220px]">
            <AppLogo src="/assets/images/logo.png" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-[31px]">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList className="flex gap-[31px]">
                        {navigationItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                {item.hasDropdown ? (
                                    <>
                                        <NavigationMenuTrigger className="group flex items-center gap-1 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] whitespace-nowrap text-white transition-opacity hover:opacity-80 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none p-0 h-auto [&>svg:first-of-type]:hidden">
                                            {item.label}
                                            <span className="relative inline-block">
                                                <ChevronDown className="h-[5px] w-[8.18px] ml-1 transition-all duration-300 group-data-[state=open]:hidden" />
                                                <ChevronUp className="h-[5px] w-[8.18px] ml-1 transition-all duration-300 absolute inset-0 group-data-[state=closed]:hidden group-data-[state=open]:block" />
                                            </span>
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
                    <GradientButton variant="green" href="/login" className="p-2 px-4">
                        Log In
                    </GradientButton>
                    <GradientButton variant="red" href="/signup" className="p-2 px-4">
                        Sign Up
                    </GradientButton>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="bg-[var(--header-bg)] border-[var(--border-medium)] w-[300px]"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-white">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6 mt-8">
                            {/* Navigation Items */}
                            <nav className="flex flex-col gap-4">
                                {navigationItems.map((item, index) => (
                                    <div key={index}>
                                        <a
                                            href={item.href}
                                            className="flex items-center justify-between [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] text-white transition-opacity hover:opacity-80 py-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span>{item.label}</span>
                                            {item.hasDropdown && (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </a>
                                        {item.hasDropdown && (
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                {services.map((service, serviceIndex) => (
                                                    <a
                                                        key={serviceIndex}
                                                        href={service.href}
                                                        className="[font-family:'DM_Sans-SemiBold',Helvetica] text-sm leading-6 font-semibold tracking-[0] text-white/80 transition-opacity hover:opacity-80 py-1"
                                                        onClick={() =>
                                                            setMobileMenuOpen(false)
                                                        }
                                                    >
                                                        {service.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--border-medium)]">
                                <GradientButton
                                    variant="green"
                                    href="/login"
                                    className="w-full"
                                >
                                    Log In
                                </GradientButton>
                                <GradientButton
                                    variant="red"
                                    href="/signup"
                                    className="w-full"
                                >
                                    Sign Up
                                </GradientButton>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
