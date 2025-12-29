import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, DollarSign, User, Users, Star, Edit, Trash2 } from 'lucide-react';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';

interface Instructor {
    id: number;
    name: string;
    user?: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    thumbnail_url: string | null;
    price: number;
    start_date: string | null;
    end_date: string | null;
    start_time: string | null;
    end_time: string | null;
    total_seats: number | null;
    rating: number | null;
    total_reviews: number;
    published_at: string | null;
    instructor: Instructor | null;
    modules?: Array<{ id: number; title: string }>;
    learningObjectives?: Array<{ id: number; objective: string }>;
    reviews?: Array<{ id: number; rating: number; comment: string }>;
    faqs?: Array<{ id: number; question: string; answer: string }>;
}

interface Props {
    course: Course;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: admin.courses.index.url(),
    },
    {
        title: 'Course Details',
        href: '#',
    },
];

export default function ShowCourse({ course }: Props) {
    const formatDate = (date: string | null) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (time: string | null) => {
        if (!time) return 'N/A';
        // If it's a datetime, extract time part
        if (time.includes(' ')) {
            return new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
        return time;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const getImageUrl = () => {
        if (course.thumbnail_url) {
            return course.thumbnail_url.startsWith('http')
                ? course.thumbnail_url
                : `/storage/${course.thumbnail_url}`;
        }
        return '/assets/images/book-placeholder.jpg';
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            router.delete(admin.courses.destroy.url({ course: course.id }));
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={course.title} />

            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <Link
                        href={admin.courses.index.url()}
                        className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Link>
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{course.title}</h1>
                            <p className="mt-2 text-muted-foreground">
                                Course details and information
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={admin.courses.edit.url({ course: course.id })}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Thumbnail */}
                        <Card>
                            <CardContent className="p-0">
                                <img
                                    src={getImageUrl()}
                                    alt={course.title}
                                    className="h-64 w-full object-cover rounded-t-lg"
                                />
                            </CardContent>
                        </Card>

                        {/* Description */}
                        {course.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground whitespace-pre-wrap">
                                        {course.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Learning Objectives */}
                        {course.learningObjectives && course.learningObjectives.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Learning Objectives</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2">
                                        {course.learningObjectives.map((objective) => (
                                            <li key={objective.id} className="text-muted-foreground">
                                                {objective.objective}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Modules */}
                        {course.modules && course.modules.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Modules</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {course.modules.map((module) => (
                                            <div
                                                key={module.id}
                                                className="rounded-lg border p-4"
                                            >
                                                <h4 className="font-medium">{module.title}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* FAQs */}
                        {course.faqs && course.faqs.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Frequently Asked Questions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {course.faqs.map((faq) => (
                                            <div key={faq.id} className="border-b pb-4 last:border-0">
                                                <h4 className="font-medium mb-2">{faq.question}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Price</p>
                                        <p className="font-semibold">{formatPrice(course.price)}</p>
                                    </div>
                                </div>

                                {course.instructor && (
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Instructor</p>
                                            <p className="font-semibold">
                                                {course.instructor.user?.name || course.instructor.name}
                                            </p>
                                            {course.instructor.user?.email && (
                                                <p className="text-xs text-muted-foreground">
                                                    {course.instructor.user.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <Star className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Rating</p>
                                        <p className="font-semibold">
                                            {course.rating ? course.rating : 'N/A'}
                                            {course.total_reviews > 0 && (
                                                <span className="text-muted-foreground ml-1">
                                                    ({course.total_reviews} reviews)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {course.total_seats && (
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Seats</p>
                                            <p className="font-semibold">{course.total_seats}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <p className="font-semibold">
                                            {course.published_at ? (
                                                <span className="text-green-600">Published</span>
                                            ) : (
                                                <span className="text-yellow-600">Draft</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Schedule */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Start Date</p>
                                    <p className="font-medium">{formatDate(course.start_date)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">End Date</p>
                                    <p className="font-medium">{formatDate(course.end_date)}</p>
                                </div>
                                {course.start_time && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Start Time</p>
                                        <p className="font-medium">{formatTime(course.start_time)}</p>
                                    </div>
                                )}
                                {course.end_time && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">End Time</p>
                                        <p className="font-medium">{formatTime(course.end_time)}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Published Date */}
                        {course.published_at && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Published</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(course.published_at)}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

