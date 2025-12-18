import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from '@inertiajs/react';
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
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    return (
        <header className="relative z-50 flex w-full items-center justify-between bg-[var(--header-bg)] px-4 py-5 md:px-8 lg:px-[220px]">
            <AppLogo src="/assets/images/logo.png" />

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-[31px] lg:flex">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList className="flex gap-[31px]">
                        {navigationItems.map((item, index) => (
                            <NavigationMenuItem key={index} className="relative">
                                {item.hasDropdown ? (
                                    <>
                                        <NavigationMenuTrigger className="group flex h-auto min-h-[28px] items-center gap-1 bg-transparent p-0 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] whitespace-nowrap text-white transition-opacity hover:bg-transparent hover:opacity-80 focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none data-[state=open]:bg-transparent data-[state=open]:opacity-80 [&>svg:first-of-type]:hidden">
                                            {item.label}
                                            <span className="relative inline-flex h-4 w-4 items-center justify-center">
                                                <ChevronDown className="absolute ml-1 h-4 w-4 transition-all duration-300 group-data-[state=open]:hidden" />
                                                <ChevronUp className="absolute ml-1 h-4 w-4 transition-all duration-300 group-data-[state=closed]:hidden group-data-[state=open]:block" />
                                            </span>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="absolute left-0 top-full z-50 mt-1.5 border-[var(--border-medium)] bg-[var(--header-bg)]">
                                            <div className="flex min-w-[160px] flex-col gap-1 p-2">
                                                {services.map(
                                                    (service, serviceIndex) => (
                                                        <Link
                                                            key={serviceIndex}
                                                            href={service.href}
                                                            className="rounded-md px-3 py-2 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] text-white transition-opacity hover:bg-white/10 hover:opacity-80"
                                                        >
                                                            {service.label}
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] whitespace-nowrap text-white transition-opacity hover:opacity-80"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex gap-3.5">
                    <GradientButton
                        variant="green"
                        href="/login"
                        className="p-2 px-6 font-semibold"
                    >
                        Log In
                    </GradientButton>
                    <GradientButton
                        variant="red"
                        href="/signup"
                        className="p-2 px-6 font-semibold"
                    >
                        Sign Up
                    </GradientButton>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-navigation-menu lg:hidden">
                <Sheet
                    open={mobileMenuOpen}
                    onOpenChange={(open) => {
                        setMobileMenuOpen(open);
                        if (!open) {
                            setOpenDropdown(null);
                        }
                    }}
                >
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10"
                        >
                            <div id="mobile-navigation-menu-icon">
                                <Menu />
                            </div>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[300px] border-[var(--border-medium)] bg-[var(--header-bg)]"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-white">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-2 flex px-5 flex-col gap-6">
                            {/* Navigation Items */}
                            <nav className="flex flex-col gap-1">
                                {navigationItems.map((item, index) => (
                                    <div key={index}>
                                        {item.hasDropdown ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className="flex w-full items-center justify-between py-2 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] text-white transition-opacity hover:opacity-80"
                                                    onClick={() =>
                                                        setOpenDropdown(
                                                            openDropdown === index
                                                                ? null
                                                                : index,
                                                        )
                                                    }
                                                >
                                                    <span>{item.label}</span>
                                                    {openDropdown === index ? (
                                                        <ChevronUp className="h-5 w-5" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5" />
                                                    )}
                                                </button>
                                                {openDropdown === index && (
                                                    <div className="mt-2 ml-4 flex flex-col gap-2">
                                                        {services.map(
                                                            (
                                                                service,
                                                                serviceIndex,
                                                            ) => (
                                                                <Link
                                                                    key={
                                                                        serviceIndex
                                                                    }
                                                                    href={
                                                                        service.href
                                                                    }
                                                                    className="py-1 [font-family:'DM_Sans-SemiBold',Helvetica] text-sm leading-6 font-semibold tracking-[0] text-white/80 transition-opacity hover:opacity-80"
                                                                    onClick={() => {
                                                                        setMobileMenuOpen(
                                                                            false,
                                                                        );
                                                                        setOpenDropdown(
                                                                            null,
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        service.label
                                                                    }
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="flex items-center justify-between py-2 [font-family:'DM_Sans-SemiBold',Helvetica] text-base leading-7 font-semibold tracking-[0] text-white transition-opacity hover:opacity-80"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                <span>{item.label}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Buttons */}
                            <div className="flex flex-col gap-4">
                                <GradientButton
                                    variant="green"
                                    href="/login"
                                    className="w-full py-2 px-4 font-semibold"
                                >
                                    Log In
                                </GradientButton>
                                <GradientButton
                                    variant="red"
                                    href="/signup"
                                    className="w-full py-2 px-4 font-semibold"
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
