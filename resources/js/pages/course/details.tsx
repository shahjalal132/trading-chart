import BreadCrumbBanner from '@/components/sections/BreadCrumbBanner';
import Community from '@/components/sections/Community';
import CourseDetailsInfo from '@/components/sections/CourseDetails';
import WebLayout from '@/layouts/web-layout';

export default function CourseDetails(): React.JSX.Element {
    return (
        <WebLayout>
            <BreadCrumbBanner
                title="Course Details"
                breadcrumbs={[
                    { title: 'Home', href: '/' },
                    { title: 'Course Details', href: '/course/details' },
                ]}
            />

            <div className="w-full md:pt-30">
                <CourseDetailsInfo />
            </div>

            {/* Community */}
            <div className="w-full pt-30 pb-20">
                <Community />
            </div>
        </WebLayout>
    );
}
