import { Separator } from '@/components/ui/separator';
import {
    ChevronRight,
    Facebook,
    Instagram,
    Info,
    Linkedin,
    Twitter,
    Youtube,
} from 'lucide-react';
import React, { useState } from 'react';
import AppLogo from '../AppLogo';
import { Link, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

interface SocialIcon {
    name: string;
    url?: string;
}

export default function Footer() {
    const { appSettings } = usePage<SharedData>().props;
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    // Use dynamic data from appSettings or fallback to defaults
    const appName = appSettings?.app_name || 'Trading Chart';
    const logoUrl = appSettings?.logo_url || '/assets/images/logo.png';
    const appDescription = appSettings?.app_description || 
        'I am deeply committed to every student, which is why I regularly provide feedback, market updates, signal guidelines, and personal corrections. I always teach using updated market trends, data analytics, and modern trading techniques so that.';
    const appInformation = appSettings?.app_information || appDescription;
    
    const quickLinks = appSettings?.quick_links && appSettings.quick_links.length > 0
        ? appSettings.quick_links.filter(link => link.label && link.href)
        : [
            { label: 'Services', href: '/services' },
            { label: 'Platform', href: '/platform' },
            { label: 'Social', href: '/social' },
        ];

    const contactPhones = appSettings?.phone_numbers && appSettings.phone_numbers.length > 0
        ? appSettings.phone_numbers.filter(phone => phone.trim() !== '')
        : ['+88 (09) 53 33 09'];

    const email = appSettings?.email || 'tradingchart@gmail.com';

    const socialIcons: SocialIcon[] = [
        { name: 'facebook', url: appSettings?.facebook_url },
        { name: 'twitter', url: appSettings?.twitter_url },
        { name: 'instagram', url: appSettings?.instagram_url },
        { name: 'linkedin', url: appSettings?.linkedin_url },
        { name: 'youtube', url: appSettings?.youtube_url },
    ].filter(icon => icon.url); // Only show icons with URLs

    return (
        <>
            <footer className="w-full bg-[var(--footer-bg)] py-16 text-white md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <div className="mb-6 flex items-center gap-3">
                                <AppLogo src={logoUrl} />
                            </div>
                            <p className="text-xl leading-[31px] font-normal text-white/80">
                                {appDescription}
                            </p>
                            {appInformation && (
                                <div className="mt-4">
                                    <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mt-4 bg-white/10 text-white hover:bg-white/20 border-white/20"
                                            >
                                                <Info className="h-4 w-4 mr-2" />
                                                Learn More
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>{appName} - Information</DialogTitle>
                                                <DialogDescription>
                                                    Learn more about our platform and services
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="mt-4">
                                                <div className="prose prose-invert max-w-none">
                                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                                        {appInformation}
                                                    </p>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center lg:col-span-1">
                            <div className="flex h-full flex-col items-center">
                                <Separator
                                    orientation="vertical"
                                    className="h-full w-px bg-gradient-to-b from-black via-white/50 to-black"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="mb-12 text-[22px] leading-10 font-bold">
                                Quick Links
                            </h3>
                            <nav className="flex flex-col gap-4">
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="flex items-center gap-2 text-base text-white/80 transition-colors hover:text-white"
                                    >
                                        <div className="flex gap-1">
                                            <ChevronRight className="h-3 w-3" />
                                            <ChevronRight className="-ml-2 h-3 w-3" />
                                        </div>
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="flex justify-center lg:col-span-1">
                            <div className="flex h-full flex-col items-center">
                                <Separator
                                    orientation="vertical"
                                    className="h-full w-px bg-gradient-to-b from-black via-white/50 to-black"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <h3 className="mb-12 text-[22px] leading-10 font-bold">
                                Contact Us
                            </h3>
                            <div className="flex flex-col gap-[59px]">
                                {contactPhones.length > 0 && (
                                    <div className="flex gap-3">
                                        <img
                                            src="/assets/icons/phone.png"
                                            alt="Phone"
                                            className="h-13 w-13"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <span className="text-base text-white/80">
                                                Call Us
                                            </span>
                                            <div className="flex flex-col">
                                                {contactPhones.map((phone, index) => (
                                                    <a
                                                        key={index}
                                                        href={`tel:${phone}`}
                                                        className="text-lg font-medium text-white transition-colors hover:text-white/80"
                                                    >
                                                        {phone}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {email && (
                                    <div className="flex gap-3">
                                        <img
                                            src="/assets/icons/mail.png"
                                            alt="Mail"
                                            className="h-13 w-13"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <span className="text-base text-white/80">
                                                Mail Us
                                            </span>
                                            <div className="flex flex-col">
                                                <a
                                                    href={`mailto:${email}`}
                                                    className="text-lg font-medium text-white transition-colors hover:text-white/80"
                                                >
                                                    {email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {socialIcons.length > 0 && (
                        <div className="mt-12 flex gap-4">
                            {socialIcons.map((icon, index) => {
                                const iconMap: Record<
                                    string,
                                    React.ComponentType<{ className?: string }>
                                > = {
                                    facebook: Facebook,
                                    twitter: Twitter,
                                    instagram: Instagram,
                                    linkedin: Linkedin,
                                    youtube: Youtube,
                                };

                                const IconComponent = iconMap[icon.name.toLowerCase()];

                                return (
                                    <a
                                        key={index}
                                        href={icon.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                                    >
                                        {IconComponent ? (
                                            <IconComponent className="h-5 w-5 text-white" />
                                        ) : (
                                            <span className="h-5 w-5" />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-1 pt-8">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <p className="text-sm text-white/60">
                                © {new Date().getFullYear()} {appName}. All
                                rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <Link
                                    href="/terms"
                                    className="text-sm text-white/60 transition-colors hover:text-white/80"
                                >
                                    Terms & Policies
                                </Link>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-white/60 transition-colors hover:text-white/80"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
