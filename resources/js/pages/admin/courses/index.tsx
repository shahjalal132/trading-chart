import { Button } from '@/components/ui/button';
import CourseCard from '@/components/admin/CourseCard';
import Pagination, { type PaginationData } from '@/components/pagination';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';

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
    author: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface Props {
    courses: {
        data: Course[];
    } & PaginationData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: admin.courses.index.url(),
    },
];

export default function CoursesIndex({ courses }: Props) {

    console.log(`courses: ${courses}`);
    console.log(`courses.data: ${courses.data}`);
    console.log(`courses.current_page: ${courses.current_page}`);
    console.log(`courses.last_page: ${courses.last_page}`);
    console.log(`courses.per_page: ${courses.per_page}`);
    console.log(`courses.total: ${courses.total}`);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            
            <div className="container mx-auto p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Courses</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your courses and content
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={admin.courses.create.url()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Course
                        </Link>
                    </Button>
                </div>

                {courses.data.length === 0 ? (
                    <div className="rounded-lg border bg-card p-12 text-center">
                        <p className="text-muted-foreground">No courses found. Create your first course to get started.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {courses.data.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}

                <Pagination
                    pagination={{
                        current_page: courses.current_page,
                        last_page: courses.last_page,
                        per_page: courses.per_page,
                        total: courses.total,
                    }}
                    getPageUrl={(page) =>
                        admin.courses.index.url({
                            query: { page },
                        })
                    }
                    itemLabel="courses"
                />
            </div>
        </AppSidebarLayout>
    );
}

