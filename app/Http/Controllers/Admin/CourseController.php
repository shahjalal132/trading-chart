<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with('author');

        // Apply search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhereHas('author', function ($authorQuery) use ($search) {
                        $authorQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        $courses = $query->latest()->paginate(15)->withQueryString();
        
        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses',
            'description' => 'nullable|string',
            'author_id' => 'required|exists:users,id',
            'price' => 'required|numeric|min:0',
            // Add more validation rules as needed
        ]);

        Course::create($validated);
        return redirect()->route('admin.courses.index');
    }

    public function show(Course $course)
    {
        $course->load(['author', 'modules.lessons', 'learningObjectives', 'reviews', 'faqs']);
        return Inertia::render('Admin/Courses/Show', ['course' => $course]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Edit', ['course' => $course]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses,slug,' . $course->id,
            'description' => 'nullable|string',
            'author_id' => 'required|exists:users,id',
            'price' => 'required|numeric|min:0',
        ]);

        $course->update($validated);
        return redirect()->route('admin.courses.index');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('admin.courses.index');
    }
}

