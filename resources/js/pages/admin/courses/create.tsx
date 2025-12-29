import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Form, Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Link } from '@inertiajs/react';

interface Instructor {
    id: number;
    name: string;
    email: string | null;
}

interface Props {
    instructors: Instructor[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: admin.courses.index.url(),
    },
    {
        title: 'Create Course',
        href: admin.courses.create.url(),
    },
];

export default function CreateCourse({ instructors }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        instructor_id: '',
        price: '',
        thumbnail: null as File | null,
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        total_seats: '',
        published_at: '',
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData('title', title);
        if (!data.slug || data.slug === generateSlug(data.title)) {
            setData('slug', generateSlug(title));
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Course" />

            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <Link
                        href={admin.courses.index.url()}
                        className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Course</h1>
                    <p className="mt-2 text-muted-foreground">
                        Fill in the details to create a new course
                    </p>
                </div>

                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(admin.courses.store.url(), {
                            forceFormData: true,
                            preserveScroll: true,
                        });
                    }}
                    className="space-y-6"
                >
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-6 text-xl font-semibold">Course Information</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="title">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="Introduction to Trading"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="slug">
                                    Slug <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="introduction-to-trading"
                                    required
                                />
                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Course description..."
                                    rows={4}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="instructor_id">
                                    Instructor <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.instructor_id}
                                    onValueChange={(value) => setData('instructor_id', value)}
                                    required
                                >
                                    <SelectTrigger id="instructor_id">
                                        <SelectValue placeholder="Select an instructor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {instructors.map((instructor) => (
                                            <SelectItem key={instructor.id} value={instructor.id.toString()}>
                                                {instructor.name} {instructor.email && `(${instructor.email})`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.instructor_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">
                                    Price <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                                <InputError message={errors.price} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('thumbnail', file);
                                        }
                                    }}
                                />
                                <InputError message={errors.thumbnail} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="total_seats">Total Seats</Label>
                                <Input
                                    id="total_seats"
                                    type="number"
                                    min="0"
                                    value={data.total_seats}
                                    onChange={(e) => setData('total_seats', e.target.value)}
                                    placeholder="50"
                                />
                                <InputError message={errors.total_seats} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-6 text-xl font-semibold">Schedule</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                <InputError message={errors.start_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    min={data.start_date || undefined}
                                />
                                <InputError message={errors.end_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input
                                    id="start_time"
                                    type="time"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                />
                                <InputError message={errors.start_time} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end_time">End Time</Label>
                                <Input
                                    id="end_time"
                                    type="time"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                />
                                <InputError message={errors.end_time} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-6 text-xl font-semibold">Publishing</h2>

                        <div className="grid gap-2">
                            <Label htmlFor="published_at">Publish Date</Label>
                            <Input
                                id="published_at"
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground">
                                Leave empty to save as draft
                            </p>
                            <InputError message={errors.published_at} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                        >
                            <Link href={admin.courses.index.url()}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Course'}
                        </Button>
                    </div>
                </Form>
            </div>
        </AppSidebarLayout>
    );
}

