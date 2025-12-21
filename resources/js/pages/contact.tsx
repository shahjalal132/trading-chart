import BreadCrumbBanner from '@/components/sections/BreadCrumbBanner';
import Community from '@/components/sections/Community';
import GetIntoTouch from '@/components/sections/GetIntoTouch';
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

            <div className="pt-30">
                {/* Contact Section */}
            <GetIntoTouch />
            </div>

            {/* Community */}
            <div className="w-full pt-30 pb-20">
                <Community />
            </div>
        </WebLayout>
    );
}
