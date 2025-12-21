import BreadCrumbBanner from '@/components/sections/BreadCrumbBanner';
import Community from '@/components/sections/Community';
import FAQ from '@/components/sections/FAQ';
import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function ContactPage(): React.JSX.Element {
    return (
        <WebLayout>
            <Head title="Contact" />
            <BreadCrumbBanner
                title="Contact Us"
                breadcrumbs={[
                    { title: 'Home', href: '/' },
                    { title: 'Contact', href: '/contact' },
                ]}
            />

           {/* Contact Section */}
           {/* <Contact /> */}

            {/* Community */}
            <div className="w-full pt-30 pb-20">
                <Community />
            </div>
        </WebLayout>
    );
}
