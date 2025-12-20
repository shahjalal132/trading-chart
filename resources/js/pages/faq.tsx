import BreadCrumbBanner from '@/components/sections/BreadCrumbBanner';
import Community from '@/components/sections/Community';
import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function CourseDetails(): React.JSX.Element {
    return (
        <WebLayout>
            <Head title="Course Details" />
            <BreadCrumbBanner
                title="Our FAQ's"
                breadcrumbs={[
                    { title: 'Home', href: '/' },
                    { title: 'FAQ\'s', href: '/faq' },
                ]}
            />

            {/* Community */}
            <div className="w-full pt-30 pb-20">
                <Community />
            </div>
        </WebLayout>
    );
}
