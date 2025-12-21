import BreadCrumbBanner from '@/components/sections/BreadCrumbBanner';
import Checkout from '@/components/sections/Checkout';
import Community from '@/components/sections/Community';
import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function CheckoutPage(): React.JSX.Element {
    return (
        <WebLayout>
            <Head title="Checkout" />
            <BreadCrumbBanner
                title="Checkout"
                breadcrumbs={[
                    { title: 'Home', href: '/' },
                    { title: 'Checkout', href: '/checkout' },
                ]}
            />

            <div className="pt-30">
                {/* Checkout Section */}
                <Checkout />
            </div>

            {/* Community */}
            <div className="w-full pt-30 pb-20">
                <Community />
            </div>
        </WebLayout>
    );
}
