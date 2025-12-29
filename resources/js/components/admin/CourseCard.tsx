import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import admin from '@/routes/admin';
import { Link } from '@inertiajs/react';
import { Calendar, DollarSign, Edit, Eye, Star, User } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    thumbnail_url: string | null;
    price: number;
    start_date: string | null;
    end_date: string | null;
    rating: number | null;
    total_reviews: number;
    published_at: string | null;
    instructor: {
        id: number;
        name: string;
        user?: {
            id: number;
            name: string;
            email: string;
        } | null;
    } | null;
}

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    const formatDate = (date: string | null) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
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

    return (
        <Card className="overflow-hidden p-3">
            <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="relative h-48 w-full shrink-0 md:h-auto md:w-64">
                    <img
                        src={getImageUrl()}
                        alt={course.title}
                        className="h-full w-full rounded-lg object-cover"
                    />
                    {course.published_at ? (
                        <span className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                            Published
                        </span>
                    ) : (
                        <span className="absolute top-2 right-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                            Draft
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <CardTitle className="text-xl">
                                    {course.title}
                                </CardTitle>
                                {course.description && (
                                    <CardDescription className="mt-2 line-clamp-2">
                                        {course.description}
                                    </CardDescription>
                                )}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="py-3">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {course.instructor && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">
                                            Instructor
                                        </span>
                                        <span className="text-sm font-medium">
                                            {course.instructor.user?.name || course.instructor.name}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">
                                        Price
                                    </span>
                                    <span className="text-sm font-medium">
                                        {formatPrice(course.price)}
                                    </span>
                                </div>
                            </div>

                            {course.start_date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">
                                            Start Date
                                        </span>
                                        <span className="text-sm font-medium">
                                            {formatDate(course.start_date)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">
                                        Rating
                                    </span>
                                    <span className="text-sm font-medium">
                                        {course.rating ? course.rating : 'N/A'}
                                        {course.total_reviews > 0 && (
                                            <span className="text-muted-foreground">
                                                {' '}
                                                ({course.total_reviews})
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between border-t pt-4">
                        <div className="text-sm text-muted-foreground">
                            Created{' '}
                            {formatDate(
                                course.published_at || course.start_date,
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link
                                    href={admin.courses.edit.url({
                                        course: course.id,
                                    })}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <Link
                                    href={admin.courses.show.url({
                                        course: course.id,
                                    })}
                                >
                                    <Eye />
                                    View
                                </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}
