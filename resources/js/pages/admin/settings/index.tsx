import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

interface AppSetting {
    id: number;
    app_name: string | null;
    logo_url: string | null;
    mobile_logo_url: string | null;
    app_description: string | null;
    app_information: string | null;
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
    const { data, setData, put, processing, errors } = useForm({
        // Application Information
        app_name: settings.app_name || '',
        logo_url: settings.logo_url || '',
        mobile_logo_url: settings.mobile_logo_url || '',
        app_description: settings.app_description || '',
        app_information: settings.app_information || '',
        
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
            onSuccess: () => {
                // Show success message
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
                                        <Label htmlFor="app_name">App Name</Label>
                                        <Input
                                            id="app_name"
                                            value={data.app_name}
                                            onChange={(e) => setData('app_name', e.target.value)}
                                            placeholder="Trading Chart"
                                        />
                                        {errors.app_name && (
                                            <p className="text-sm text-red-500">{errors.app_name}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="logo_url">Logo URL</Label>
                                        <Input
                                            id="logo_url"
                                            value={data.logo_url}
                                            onChange={(e) => setData('logo_url', e.target.value)}
                                            placeholder="/assets/images/logo.png"
                                        />
                                        {errors.logo_url && (
                                            <p className="text-sm text-red-500">{errors.logo_url}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="mobile_logo_url">Mobile Logo URL</Label>
                                        <Input
                                            id="mobile_logo_url"
                                            value={data.mobile_logo_url}
                                            onChange={(e) => setData('mobile_logo_url', e.target.value)}
                                            placeholder="/assets/images/logo-mobile.png"
                                        />
                                        {errors.mobile_logo_url && (
                                            <p className="text-sm text-red-500">{errors.mobile_logo_url}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="app_description">App Description</Label>
                                        <Textarea
                                            id="app_description"
                                            value={data.app_description}
                                            onChange={(e) => setData('app_description', e.target.value)}
                                            placeholder="Brief description of your application"
                                            rows={4}
                                        />
                                        {errors.app_description && (
                                            <p className="text-sm text-red-500">{errors.app_description}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="app_information">App Information (for modal)</Label>
                                        <Textarea
                                            id="app_information"
                                            value={data.app_information}
                                            onChange={(e) => setData('app_information', e.target.value)}
                                            placeholder="Detailed information about your application that will be displayed in the info modal"
                                            rows={6}
                                        />
                                        {errors.app_information && (
                                            <p className="text-sm text-red-500">{errors.app_information}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Social Links</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="facebook_url">Facebook URL</Label>
                                        <Input
                                            id="facebook_url"
                                            type="url"
                                            value={data.facebook_url}
                                            onChange={(e) => setData('facebook_url', e.target.value)}
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                        {errors.facebook_url && (
                                            <p className="text-sm text-red-500">{errors.facebook_url}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="twitter_url">Twitter URL</Label>
                                        <Input
                                            id="twitter_url"
                                            type="url"
                                            value={data.twitter_url}
                                            onChange={(e) => setData('twitter_url', e.target.value)}
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                        {errors.twitter_url && (
                                            <p className="text-sm text-red-500">{errors.twitter_url}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="instagram_url">Instagram URL</Label>
                                        <Input
                                            id="instagram_url"
                                            type="url"
                                            value={data.instagram_url}
                                            onChange={(e) => setData('instagram_url', e.target.value)}
                                            placeholder="https://instagram.com/yourhandle"
                                        />
                                        {errors.instagram_url && (
                                            <p className="text-sm text-red-500">{errors.instagram_url}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                        <Input
                                            id="linkedin_url"
                                            type="url"
                                            value={data.linkedin_url}
                                            onChange={(e) => setData('linkedin_url', e.target.value)}
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                        {errors.linkedin_url && (
                                            <p className="text-sm text-red-500">{errors.linkedin_url}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="youtube_url">YouTube URL</Label>
                                        <Input
                                            id="youtube_url"
                                            type="url"
                                            value={data.youtube_url}
                                            onChange={(e) => setData('youtube_url', e.target.value)}
                                            placeholder="https://youtube.com/@yourchannel"
                                        />
                                        {errors.youtube_url && (
                                            <p className="text-sm text-red-500">{errors.youtube_url}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Contact Information</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="tradingchart@gmail.com"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Phone Numbers</Label>
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
                                        {errors.phone_numbers && (
                                            <p className="text-sm text-red-500">{errors.phone_numbers}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Your business address"
                                            rows={3}
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-500">{errors.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Quick Links</h2>
                                
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Footer Quick Links</Label>
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
                                                placeholder="Link Label"
                                            />
                                            <Input
                                                value={link.href}
                                                onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                                                placeholder="/link-path"
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
                                    {errors.quick_links && (
                                        <p className="text-sm text-red-500">{errors.quick_links}</p>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* App Settings Tab */}
                        <TabsContent value="app-settings" className="mt-20 md:mt-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Application Configuration</h2>
                                
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Input
                                            id="timezone"
                                            value={data.timezone}
                                            onChange={(e) => setData('timezone', e.target.value)}
                                            placeholder="UTC"
                                        />
                                        {errors.timezone && (
                                            <p className="text-sm text-red-500">{errors.timezone}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="locale">Locale</Label>
                                        <Input
                                            id="locale"
                                            value={data.locale}
                                            onChange={(e) => setData('locale', e.target.value)}
                                            placeholder="en"
                                        />
                                        {errors.locale && (
                                            <p className="text-sm text-red-500">{errors.locale}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="currency">Currency</Label>
                                        <Input
                                            id="currency"
                                            value={data.currency}
                                            onChange={(e) => setData('currency', e.target.value)}
                                            placeholder="USD"
                                        />
                                        {errors.currency && (
                                            <p className="text-sm text-red-500">{errors.currency}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="currency_symbol">Currency Symbol</Label>
                                        <Input
                                            id="currency_symbol"
                                            value={data.currency_symbol}
                                            onChange={(e) => setData('currency_symbol', e.target.value)}
                                            placeholder="$"
                                        />
                                        {errors.currency_symbol && (
                                            <p className="text-sm text-red-500">{errors.currency_symbol}</p>
                                        )}
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
                                        <Label htmlFor="environment">Environment</Label>
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
                                        {errors.environment && (
                                            <p className="text-sm text-red-500">{errors.environment}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="maintenance_mode"
                                            checked={data.maintenance_mode}
                                            onChange={(e) => setData('maintenance_mode', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                                    </div>

                                    {data.maintenance_mode && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="maintenance_message">Maintenance Message</Label>
                                            <Textarea
                                                id="maintenance_message"
                                                value={data.maintenance_message}
                                                onChange={(e) => setData('maintenance_message', e.target.value)}
                                                placeholder="We are currently performing maintenance. Please check back soon."
                                                rows={4}
                                            />
                                            {errors.maintenance_message && (
                                                <p className="text-sm text-red-500">{errors.maintenance_message}</p>
                                            )}
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

