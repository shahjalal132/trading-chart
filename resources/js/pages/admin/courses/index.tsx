import CourseCard from '@/components/admin/CourseCard';
import Pagination, { type PaginationData } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

interface Props {
    courses: {
        data: Course[];
    } & PaginationData;
    filters?: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: admin.courses.index.url(),
    },
];

export default function CoursesIndex({ courses, filters }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const isInitialMount = useRef(true);

    // Debounced search
    useEffect(() => {
        // Skip on initial mount to avoid unnecessary request
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            router.get(
                admin.courses.index.url({
                    query: {
                        search: search || undefined,
                        page: 1, // Reset to first page when searching
                    },
                }),
                {},
                {
                    preserveState: true,
                    preserveScroll: false,
                    replace: true,
                },
            );
        }, 500); // 500ms debounce

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleClearSearch = () => {
        setSearch('');
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />

            <div className="container mx-auto p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Courses</h1>
                        <p className="mt-2 text-muted-foreground">
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

                {/* Filter and Search */}
                <div className="mb-6 flex items-center justify-between">
                    <div></div>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search courses by title, description, or author..."
                            className="w-full pr-10 pl-10"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                aria-label="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {courses.data.length === 0 ? (
                    <div className="rounded-lg border bg-card p-12 text-center">
                        <p className="text-muted-foreground">
                            No courses found. Create your first course to get
                            started.
                        </p>
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
                            query: {
                                page,
                                search: search || undefined,
                            },
                        })
                    }
                    itemLabel="courses"
                />
            </div>
        </AppSidebarLayout>
    );
}
