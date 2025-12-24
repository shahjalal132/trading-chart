import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import courseData from '@/data/course-details.json';
import { Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronDown,
    CircleCheck,
    Clock,
    Instagram,
    Lock,
    MessageCircle,
    Send,
    Star,
    Users,
    Youtube,
} from 'lucide-react';
import React, { useState } from 'react';

export default function CourseDetailsInfo(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState('course-info');
    const [expandedModules, setExpandedModules] = useState<
        Record<number, boolean>
    >({ 1: true });

    const {
        course,
        courseInfo,
        tabs,
        ratingBreakdown,
        reviews,
        courseInfoContent,
        curriculum,
        instructor,
    } = courseData;

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId],
        }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'course-info':
                return (
                    <div className="mt-8 space-y-6 rounded-2xl">
                        <div className="space-y-4 leading-relaxed text-gray-300">
                            {courseInfoContent.description.map(
                                (para, index) => (
                                    <p key={index}>{para}</p>
                                ),
                            )}
                        </div>

                        <div>
                            <h3 className="mb-6 text-4xl font-bold">
                                What you'll learn?
                            </h3>
                            <p className="mb-6 text-gray-300">
                                {courseInfoContent.whatYouLearn.intro}
                            </p>

                            <div className="space-y-6">
                                {courseInfoContent.whatYouLearn.learningPoints.map(
                                    (point, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="mt-1 flex-shrink-0">
                                                <CircleCheck className="h-6 w-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-semibold text-white">
                                                    {point.title}
                                                </h4>
                                                <p className="text-sm text-gray-400">
                                                    {point.description}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'curriculum':
                return (
                    <div className="mt-8 rounded-2xl">
                        <h2 className="mb-6 text-3xl font-bold">
                            Course Curriculum
                        </h2>
                        <div className="space-y-3">
                            {curriculum.modules.map((module) => (
                                <div
                                    key={module.id}
                                    className={`overflow-hidden rounded-md ${
                                        expandedModules[module.id]
                                            ? 'bg-[#222428]'
                                            : 'border border-[#383a3e] bg-transparent'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="hover:bg-gray-750 flex w-full items-center justify-between p-5 transition-colors hover:cursor-pointer"
                                    >
                                        <span className="text-left font-medium">
                                            {module.title}
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform ${
                                                expandedModules[module.id]
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </button>

                                    {expandedModules[module.id] &&
                                        module.lessons.length > 0 && (
                                            <div className="border-t border-gray-700">
                                                {module.lessons.map(
                                                    (lesson, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center justify-between px-5 py-4 ${
                                                                idx === 0
                                                                    ? 'border-b border-dotted border-gray-700'
                                                                    : 'border-b border-gray-700 last:border-b-0'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-gray-400">
                                                                    •
                                                                </span>
                                                                <Link
                                                                    href="#"
                                                                    className="cursor-pointer text-gray-300 transition-colors hover:text-yellow-400"
                                                                >
                                                                    {
                                                                        lesson.title
                                                                    }
                                                                </Link>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-gray-400">
                                                                {lesson.locked && (
                                                                    <Lock className="h-4 w-4" />
                                                                )}
                                                                <span className="text-sm">
                                                                    (
                                                                    {
                                                                        lesson.duration
                                                                    }
                                                                    )
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'instructor':
                return (
                    <div className="mt-8">
                        <h2 className="mb-6 text-3xl font-bold">
                            Course Instructors
                        </h2>
                        <div className="rounded-3xl bg-[#222428] p-8">
                            <div className="flex flex-col items-center gap-6 md:items-start md:flex-row">
                                <div className="flex-shrink-0">
                                    {/* instructor image */}
                                    <img src="/assets/images/marketing.png" alt="Instructor Image" className="h-32 w-32 rounded-full object-cover border-2 border-white" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    {/* instructor role */}
                                    <div className="mb-1 text-lg font-semibold text-red-500">
                                        {instructor.role}
                                    </div>
                                    {/* instructor name */}
                                    <h3 className="mb-4 text-2xl font-bold">
                                        {instructor.name}
                                    </h3>
                                    {/* instructor description */}
                                    <div className="mb-6 space-y-4 leading-relaxed text-gray-300">
                                        {instructor.description.map(
                                            (para, index) => (
                                                <p key={index}>{para}</p>
                                            ),
                                        )}
                                    </div>
                                    {/* instructor social links */}
                                    <div className="flex gap-4">
                                        {instructor.socialLinks.map(
                                            (link, index) => {
                                                const getIcon = () => {
                                                    switch (link.platform) {
                                                        case 'youtube':
                                                            return (
                                                                <Youtube className="h-5 w-5" />
                                                            );
                                                        case 'instagram':
                                                            return (
                                                                <Instagram className="h-5 w-5" />
                                                            );
                                                        case 'telegram':
                                                            return (
                                                                <Send className="h-5 w-5" />
                                                            );
                                                        case 'messenger':
                                                            return (
                                                                <MessageCircle className="h-5 w-5" />
                                                            );
                                                        case 'facebook':
                                                            return (
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                                                                </svg>
                                                            );
                                                        case 'medium':
                                                            return (
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                                                </svg>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                };

                                                return (
                                                    <a
                                                        key={index}
                                                        href={link.url}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 transition-colors hover:bg-gray-600"
                                                    >
                                                        {getIcon()}
                                                    </a>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'reviews':
                return (
                    <div className="mt-8 space-y-6">
                        {/* Course Reviews Section */}
                        <div className="rounded-2xl bg-[#222428] p-8">
                            <h2 className="mb-6 [font-family:'DM_Sans-SemiBold',Helvetica] text-[28px] leading-tight font-semibold tracking-[0]">
                                Course Reviews
                            </h2>

                            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                                {/* Overall Rating */}
                                <div className="text-center">
                                    <div className="mb-2 [font-family:'DM_Sans-SemiBold',Helvetica] text-[150px] leading-none font-semibold tracking-[0] text-yellow-400">
                                        {course.overallRating}
                                    </div>
                                    <div className="mb-2 flex justify-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <div className="[font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0] text-gray-400">
                                        {course.totalReviews}+ Reviews
                                    </div>
                                </div>

                                {/* Rating Breakdown */}
                                <div className="space-y-2 md:col-span-2">
                                    {ratingBreakdown.map((rating) => (
                                        <div
                                            key={rating.stars}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex w-24 gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-4 w-4 ${
                                                            star <= rating.stars
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-600'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#222428]">
                                                <div
                                                    className="h-full bg-yellow-400"
                                                    style={{
                                                        width: `${(rating.count / rating.total) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="w-8 text-sm text-gray-400">
                                                ({rating.count})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Course Description Section */}
                        <div className="rounded-2xl bg-[#222428] p-8">
                            {/* Review Carousel */}
                            <Carousel
                                className="relative mt-5 w-full rounded-lg"
                                autoplay={true}
                                autoplayInterval={5000}
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                            >
                                <CarouselContent>
                                    {reviews.map((review, index) => (
                                        <CarouselItem key={index}>
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex justify-center gap-1">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <Star
                                                                key={star}
                                                                className="h-6 w-6 fill-yellow-400 text-yellow-400"
                                                            />
                                                        ),
                                                    )}
                                                </div>

                                                <p className="mx-auto mb-6 max-w-2xl text-center [font-family:'DM_Sans-SemiBold',Helvetica] text-[28px] leading-tight font-semibold tracking-[0]">
                                                    {review.text}
                                                </p>

                                                <div className="flex items-center justify-center gap-3">
                                                    <img src={review.avatar} alt={review.author} className="h-14 w-14 rounded-full object-cover border-2 border-white" />
                                                    <div>
                                                        <div className="[font-family:'DM_Sans-Medium',Helvetica] text-base leading-7 font-medium tracking-[0]">
                                                            {review.author}
                                                        </div>
                                                        <div className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-lg leading-7 font-bold tracking-[0] text-gray-400">
                                                            {review.role}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 text-white">
            <div className="mx-auto max-w-6xl">
                {/* Main Content Grid */}
                <div className="mb-16 grid grid-cols-1 gap-7 lg:grid-cols-3">
                    {/* Course Image */}
                    <div className="lg:col-span-2 lg:max-h-[640px]">
                        <img
                            src="/assets/images/course-details.png"
                            alt="Course Image"
                            className="h-full w-full rounded-3xl object-cover"
                        />
                    </div>

                    {/* Course Info Card */}
                    <div className="rounded-3xl lg:max-h-[640px] bg-[#222428] p-8 pt-10">
                        <h3 className="text-[26px] leading-[1px] font-semibold">
                            Course Info
                        </h3>

                        <div className="mt-[30px] mb-[40px] h-[3px] w-[145px] bg-red-500" />

                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center [font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    <Calendar className="mr-2 h-5 w-5 text-red-500" />
                                    Start Date
                                </span>
                                <span className="[font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    {courseInfo.startDate}
                                </span>
                            </div>

                            <div className="w-full border-b border-[#383a3e]" />

                            <div className="flex items-center justify-between">
                                <span className="flex items-center [font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    <Calendar className="mr-2 h-5 w-5 text-red-500" />
                                    End Date
                                </span>
                                <span className="[font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    {courseInfo.endDate}
                                </span>
                            </div>

                            <div className="w-full border-b border-[#383a3e]" />

                            <div className="flex items-center justify-between">
                                <span className="flex items-center [font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    <Clock className="mr-2 h-5 w-5 text-red-500" />
                                    Start Time
                                </span>
                                <span className="[font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    {courseInfo.startTime}
                                </span>
                            </div>

                            <div className="w-full border-b border-[#383a3e]" />

                            <div className="flex items-center justify-between">
                                <span className="flex items-center [font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    <Clock className="mr-2 h-5 w-5 text-red-500" />
                                    End Time
                                </span>
                                <span className="[font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    {courseInfo.endTime}
                                </span>
                            </div>

                            <div className="w-full border-b border-[#383a3e]" />

                            <div className="flex items-center justify-between">
                                <span className="flex items-center [font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    <Users className="mr-2 h-5 w-5 text-red-500" />
                                    Total Seat
                                </span>
                                <span className="[font-family:'DM_Sans-Regular',Helvetica] text-lg leading-7 font-normal tracking-[0]">
                                    {courseInfo.totalSeats}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 w-full border-b border-[#383a3e]" />

                        <div className="border-t border-gray-800 pt-4">
                            <div className="my-7 flex items-center justify-between">
                                <span className="[font-family:'DM_Sans-SemiBold',Helvetica] text-[26px] leading-7 font-semibold tracking-[0]">
                                    Course Price:
                                </span>
                                <span className="[font-family:'DM_Sans-SemiBold',Helvetica] text-[26px] leading-7 font-semibold tracking-[0] text-red-500">
                                    ${course.price}
                                </span>
                            </div>

                            <button className="w-full rounded-3xl bg-red-600 py-3 [font-family:'DM_Sans-SemiBold',Helvetica] text-lg leading-7 font-semibold tracking-[0] text-white transition-colors hover:bg-red-700 hover:cursor-pointer">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Course Content Section - spans 2 columns on lg screens */}
                    <div className="lg:col-span-2">
                        {/* Course Title and Tabs */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                <span className="[font-family:'DM_Sans-Bold',Helvetica] text-lg leading-7 font-bold tracking-[0]">
                                    ({course.rating} ★ Ratings)
                                </span>
                            </div>

                            <h2 className="my-6 md:mt-8 md:mb-10 [font-family:'DM_Sans-SemiBold',Helvetica] text-[36px] md:text-[50px] leading-tight font-semibold tracking-[0]">
                                {course.title}
                            </h2>

                            {/* Tabs */}
                            <div className="flex flex-col md:flex-row gap-3 md:flex-wrap md:gap-5 rounded-4xl bg-[#222428] p-3 lg:max-w-[81%]">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`rounded-full px-6 py-2 [font-family:'DM_Sans-SemiBold',Helvetica] text-[17px] leading-7 font-semibold tracking-[0] transition-colors ${
                                            activeTab === tab.id
                                                ? tab.id === 'curriculum'
                                                    ? 'bg-yellow-400 text-gray-900'
                                                    : 'bg-red-600 text-white'
                                                : 'bg-[#222428] hover:cursor-pointer hover:bg-gray-700'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
