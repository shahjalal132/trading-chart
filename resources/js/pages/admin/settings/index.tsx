import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';

interface AppSetting {
    id: number;
    app_name: string | null;
    logo_url: string | null;
    mobile_logo_url: string | null;
    app_description: string | null;
    app_information: string | null;
    copyright_text: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    instagram_url: string | null;
    linkedin_url: string | null;
    youtube_url: string | null;
    email: string | null;
    phone_numbers: string[] | null;
    address: string | null;
    quick_links: Array<{ label: string; href: string }> | null;
    environment: string;
    maintenance_mode: boolean;
    maintenance_message: string | null;
    timezone: string;
    locale: string;
    currency: string;
    currency_symbol: string;
}

interface Props {
    settings: AppSetting;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: admin.settings.index.url(),
    },
];

export default function SettingsIndex({ settings }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const { data, setData, put, processing, errors } = useForm({
        // Application Information
        app_name: settings.app_name || '',
        logo: null as File | null,
        mobile_logo: null as File | null,
        logo_url: settings.logo_url || '',
        mobile_logo_url: settings.mobile_logo_url || '',
        app_description: settings.app_description || '',
        app_information: settings.app_information || '',
        copyright_text: settings.copyright_text || '',
        
        // Social Links
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        instagram_url: settings.instagram_url || '',
        linkedin_url: settings.linkedin_url || '',
        youtube_url: settings.youtube_url || '',
        
        // Contact Information
        email: settings.email || '',
        phone_numbers: settings.phone_numbers || [''],
        address: settings.address || '',
        
        // Quick Links
        quick_links: settings.quick_links || [{ label: '', href: '' }],
        
        // Environment Settings
        environment: settings.environment || 'production',
        maintenance_mode: settings.maintenance_mode || false,
        maintenance_message: settings.maintenance_message || '',
        
        // App Settings
        timezone: settings.timezone || 'UTC',
        locale: settings.locale || 'en',
        currency: settings.currency || 'USD',
        currency_symbol: settings.currency_symbol || '$',
    });


    const [activeTab, setActiveTab] = useState('web-setup');

    // Show toast notifications for flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const addPhoneNumber = () => {
        setData('phone_numbers', [...(data.phone_numbers || []), '']);
    };

    const removePhoneNumber = (index: number) => {
        const phones = [...(data.phone_numbers || [])];
        phones.splice(index, 1);
        setData('phone_numbers', phones.length > 0 ? phones : ['']);
    };

    const updatePhoneNumber = (index: number, value: string) => {
        const phones = [...(data.phone_numbers || [])];
        phones[index] = value;
        setData('phone_numbers', phones);
    };

    const addQuickLink = () => {
        setData('quick_links', [...(data.quick_links || []), { label: '', href: '' }]);
    };

    const removeQuickLink = (index: number) => {
        const links = [...(data.quick_links || [])];
        links.splice(index, 1);
        setData('quick_links', links.length > 0 ? links : [{ label: '', href: '' }]);
    };

    const updateQuickLink = (index: number, field: 'label' | 'href', value: string) => {
        const links = [...(data.quick_links || [])];
        links[index] = { ...links[index], [field]: value };
        setData('quick_links', links);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.settings.update.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Settings updated successfully.');
            },
            onError: () => {
                toast.error('Failed to update settings. Please check the form for errors.');
            },
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Application Settings" />
            
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Application Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your application configuration and settings
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                            <TabsTrigger value="web-setup">Web Setup</TabsTrigger>
                            <TabsTrigger value="app-settings">App Settings</TabsTrigger>
                            <TabsTrigger value="environment">Environment Settings</TabsTrigger>
                        </TabsList>

                        {/* Web Setup Tab */}
                        <TabsContent value="web-setup" className="mt-20 md:mt-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Application Information</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="app_name">App Name <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="app_name"
                                            value={data.app_name}
                                            onChange={(e) => setData('app_name', e.target.value)}
                                            placeholder="Trading Chart"
                                        />
                                        <InputError message={errors.app_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="logo">Logo <span className="text-muted-foreground">(optional)</span></Label>
                                        {data.logo_url && (
                                            <div className="mb-2">
                                                <img 
                                                    src={data.logo_url.startsWith('http') ? data.logo_url : `/storage/${data.logo_url}`} 
                                                    alt="Current logo" 
                                                    className="h-20 w-auto object-contain"
                                                />
                                            </div>
                                        )}
                                        <Input
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setData('logo', file);
                                                }
                                            }}
                                        />
                                        <InputError message={errors.logo} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="mobile_logo">Mobile Logo <span className="text-muted-foreground">(optional)</span></Label>
                                        {data.mobile_logo_url && (
                                            <div className="mb-2">
                                                <img 
                                                    src={data.mobile_logo_url.startsWith('http') ? data.mobile_logo_url : `/storage/${data.mobile_logo_url}`} 
                                                    alt="Current mobile logo" 
                                                    className="h-20 w-auto object-contain"
                                                />
                                            </div>
                                        )}
                                        <Input
                                            id="mobile_logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setData('mobile_logo', file);
                                                }
                                            }}
                                        />
                                        <InputError message={errors.mobile_logo} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="app_description">App Description <span className="text-muted-foreground">(optional)</span></Label>
                                        <Textarea
                                            id="app_description"
                                            value={data.app_description}
                                            onChange={(e) => setData('app_description', e.target.value)}
                                            placeholder="Brief description of your application"
                                            rows={4}
                                        />
                                        <InputError message={errors.app_description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="app_information">App Information (for modal) <span className="text-muted-foreground">(optional)</span></Label>
                                        <Textarea
                                            id="app_information"
                                            value={data.app_information}
                                            onChange={(e) => setData('app_information', e.target.value)}
                                            placeholder="Detailed information about your application that will be displayed in the info modal"
                                            rows={6}
                                        />
                                        <InputError message={errors.app_information} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="copyright_text">Copyright Text <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="copyright_text"
                                            value={data.copyright_text}
                                            onChange={(e) => setData('copyright_text', e.target.value)}
                                            placeholder="© 2024 Trading Chart. All rights reserved."
                                        />
                                        <InputError message={errors.copyright_text} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Social Links</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="facebook_url">Facebook URL <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="facebook_url"
                                            type="url"
                                            value={data.facebook_url}
                                            onChange={(e) => setData('facebook_url', e.target.value)}
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                        <InputError message={errors.facebook_url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="twitter_url">Twitter URL <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="twitter_url"
                                            type="url"
                                            value={data.twitter_url}
                                            onChange={(e) => setData('twitter_url', e.target.value)}
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                        <InputError message={errors.twitter_url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="instagram_url">Instagram URL <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="instagram_url"
                                            type="url"
                                            value={data.instagram_url}
                                            onChange={(e) => setData('instagram_url', e.target.value)}
                                            placeholder="https://instagram.com/yourhandle"
                                        />
                                        <InputError message={errors.instagram_url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="linkedin_url">LinkedIn URL <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="linkedin_url"
                                            type="url"
                                            value={data.linkedin_url}
                                            onChange={(e) => setData('linkedin_url', e.target.value)}
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                        <InputError message={errors.linkedin_url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="youtube_url">YouTube URL <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="youtube_url"
                                            type="url"
                                            value={data.youtube_url}
                                            onChange={(e) => setData('youtube_url', e.target.value)}
                                            placeholder="https://youtube.com/@yourchannel"
                                        />
                                        <InputError message={errors.youtube_url} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Contact Information</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="tradingchart@gmail.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Phone Numbers <span className="text-muted-foreground">(optional)</span></Label>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addPhoneNumber}
                                            >
                                                Add Phone
                                            </Button>
                                        </div>
                                        {data.phone_numbers?.map((phone, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    value={phone}
                                                    onChange={(e) => updatePhoneNumber(index, e.target.value)}
                                                    placeholder="+88 (09) 53 33 09"
                                                />
                                                {data.phone_numbers && data.phone_numbers.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => removePhoneNumber(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <InputError message={errors.phone_numbers} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Address <span className="text-muted-foreground">(optional)</span></Label>
                                        <Textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Your business address"
                                            rows={3}
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Quick Links</h2>
                                
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Footer Quick Links <span className="text-muted-foreground">(optional)</span></Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addQuickLink}
                                        >
                                            Add Link
                                        </Button>
                                    </div>
                                    {data.quick_links?.map((link, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={link.label}
                                                onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                                                placeholder="Link Label (required)"
                                            />
                                            <Input
                                                value={link.href}
                                                onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                                                placeholder="/link-path (required)"
                                            />
                                            {data.quick_links && data.quick_links.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeQuickLink(index)}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <InputError message={errors.quick_links} />
                                </div>
                            </div>
                        </TabsContent>

                        {/* App Settings Tab */}
                        <TabsContent value="app-settings" className="mt-20 md:mt-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Application Configuration</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="timezone">Timezone <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="timezone"
                                            value={data.timezone}
                                            onChange={(e) => setData('timezone', e.target.value)}
                                            placeholder="UTC"
                                        />
                                        <InputError message={errors.timezone} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="locale">Locale <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="locale"
                                            value={data.locale}
                                            onChange={(e) => setData('locale', e.target.value)}
                                            placeholder="en"
                                        />
                                        <InputError message={errors.locale} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="currency">Currency <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="currency"
                                            value={data.currency}
                                            onChange={(e) => setData('currency', e.target.value)}
                                            placeholder="USD"
                                        />
                                        <InputError message={errors.currency} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="currency_symbol">Currency Symbol <span className="text-muted-foreground">(optional)</span></Label>
                                        <Input
                                            id="currency_symbol"
                                            value={data.currency_symbol}
                                            onChange={(e) => setData('currency_symbol', e.target.value)}
                                            placeholder="$"
                                        />
                                        <InputError message={errors.currency_symbol} />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Environment Settings Tab */}
                        <TabsContent value="environment" className="mt-20 md:mt-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Environment Configuration</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="environment">Environment <span className="text-muted-foreground">(optional)</span></Label>
                                        <select
                                            id="environment"
                                            value={data.environment}
                                            onChange={(e) => setData('environment', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="local">Local</option>
                                            <option value="staging">Staging</option>
                                            <option value="production">Production</option>
                                        </select>
                                        <InputError message={errors.environment} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="maintenance_mode"
                                            checked={data.maintenance_mode}
                                            onChange={(e) => setData('maintenance_mode', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="maintenance_mode">Maintenance Mode <span className="text-muted-foreground">(optional)</span></Label>
                                    </div>

                                    {data.maintenance_mode && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="maintenance_message">Maintenance Message <span className="text-muted-foreground">(optional)</span></Label>
                                            <Textarea
                                                id="maintenance_message"
                                                value={data.maintenance_message}
                                                onChange={(e) => setData('maintenance_message', e.target.value)}
                                                placeholder="We are currently performing maintenance. Please check back soon."
                                                rows={4}
                                            />
                                            <InputError message={errors.maintenance_message} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}

