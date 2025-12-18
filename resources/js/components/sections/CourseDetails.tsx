import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import courseData from '@/data/course-details.json';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseDetailsInfo(): React.JSX.Element {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('course-info');

    const { course, courseInfo, tabs, ratingBreakdown, reviews } = courseData;

    const nextReview = () => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex(
            (prev) => (prev - 1 + reviews.length) % reviews.length,
        );
    };

    return (
        <div className="min-h-screen p-8 text-white">
            <div className="mx-auto max-w-6xl">
                {/* Main Content Grid */}
                <div className="mb-16 grid grid-cols-1 gap-7 lg:grid-cols-3">
                    {/* Course Image */}
                    <div className="lg:col-span-2">
                        <div className="aspect-video h-full w-full rounded-3xl bg-gray-200"></div>
                    </div>

                    {/* Course Info Card */}
                    <div className="rounded-3xl bg-[#222428] p-8 pt-10">
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

                        <div className="w-full mt-4 border-b border-[#383a3e]" />

                        <div className="border-t border-gray-800 pt-4">
                            <div className="my-7 flex items-center justify-between">
                                <span className="[font-family:'DM_Sans-SemiBold',Helvetica] text-[26px] leading-7 font-semibold tracking-[0]">
                                    Course Price:
                                </span>
                                <span className="[font-family:'DM_Sans-SemiBold',Helvetica] text-[26px] leading-7 font-semibold tracking-[0] text-red-500">
                                    ${course.price}
                                </span>
                            </div>

                            <button className="w-full rounded-3xl bg-red-600 py-3 [font-family:'DM_Sans-SemiBold',Helvetica] text-lg leading-7 font-semibold tracking-[0] text-white transition-colors hover:bg-red-700">
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
                                <span className="[font-family:'DM_Sans-Bold',Helvetica] text-lg leading-7 font-bold tracking-[0] ">
                                    ({course.rating} ★ Ratings)
                                </span>
                            </div>

                            <h2 className="mt-8 mb-10 [font-family:'DM_Sans-SemiBold',Helvetica] text-[50px] leading-tight font-semibold tracking-[0]">
                                {course.title}
                            </h2>

                            {/* Tabs */}
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <TabsList className="flex max-w-[593px] gap-5 rounded-4xl bg-[#222428] p-3">
                                    {tabs.map((tab) => (
                                        <TabsTrigger
                                            key={tab.id}
                                            value={tab.id}
                                            className="rounded-full px-6 py-2 [font-family:'DM_Sans-SemiBold',Helvetica] text-[17px] leading-7 font-semibold tracking-[0] transition-colors data-[state=active]:bg-red-600 data-[state=inactive]:bg-transparent data-[state=inactive]:hover:bg-gray-700"
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {tabs.map((tab) => (
                                    <TabsContent key={tab.id} value={tab.id}>
                                        {/* Tab content will go here */}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>

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
                        <div className="mt-6 rounded-2xl bg-[#222428] p-8">
                            {/* Review Carousel */}
                            <Carousel className="relative mt-5 w-full rounded-lg">
                                <CarouselContent className="-ml-0">
                                    {reviews.map((review, index) => (
                                        <CarouselItem
                                            key={index}
                                            className={`pl-0 ${
                                                index === currentReviewIndex
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
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
                                                    "{review.text}"
                                                </p>

                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="h-12 w-12 rounded-full bg-[#222428]"></div>
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
                                <CarouselPrevious onClick={prevReview} />
                                <CarouselNext onClick={nextReview} />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
