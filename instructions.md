Below is a **single, clean `.md` file** you can **copy–paste directly into Cursor** and tell it to implement step by step.
It is written as **engineering instructions**, not explanation text.

---

# LMS Role-Based Access Control & Dashboard Implementation Guide (Laravel)

This document defines the **complete implementation process** for role-based users, permissions, dashboards, and admin menu structure for a Laravel-based LMS.

Roles:
- admin
- instructor
- student

The system must enforce strict access control using **policies, middleware, and route separation**.

---

## 1. User Roles Strategy

### Decision
Use a **single `role` column** on the `users` table.

Allowed values:
- admin
- instructor
- student

Reason:
- Simple
- Fast
- Scales well for ≤ 10 roles
- Easy to enforce in policies and middleware

---

## 2. Database Requirements

### Users Table
- Add `role` column (enum or string)
- Default role: `student`
- Index `role` column

Example migration:
```php
$table->enum('role', ['admin', 'instructor', 'student'])
      ->default('student')
      ->index();

---

## 3. User Model Setup

### app/Models/User.php

```php
class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar_url',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isInstructor(): bool
    {
        return $this->role === 'instructor';
    }

    public function isStudent(): bool
    {
        return $this->role === 'student';
    }

    public function instructor()
    {
        return $this->hasOne(Instructor::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
```

---

## 4. Global Authorization Rule (Admin Override)

### app/Providers/AuthServiceProvider.php

```php
Gate::before(function ($user) {
    if ($user->isAdmin()) {
        return true;
    }
});
```

Effect:

* Admin can perform **any action**
* No need to repeat admin checks everywhere

---

## 5. Policies (Core Rule Enforcement)

### Generate Policies

```bash
php artisan make:policy CoursePolicy --model=Course
php artisan make:policy LessonPolicy --model=Lesson
```

---

### CoursePolicy

```php
class CoursePolicy
{
    public function view(User $user, Course $course)
    {
        return true;
    }

    public function create(User $user)
    {
        return $user->isInstructor();
    }

    public function update(User $user, Course $course)
    {
        return $user->isInstructor()
            && $course->instructor->user_id === $user->id;
    }

    public function delete(User $user, Course $course)
    {
        return $this->update($user, $course);
    }
}
```

Rules:

* Instructor manages only their own courses
* Admin bypasses automatically

---

### LessonPolicy (Watching Lessons)

```php
class LessonPolicy
{
    public function watch(User $user, Lesson $lesson)
    {
        return $user->enrollments()
            ->where('course_id', $lesson->module->course_id)
            ->exists();
    }
}
```

Rules:

* Students must be enrolled
* Locked lessons enforced centrally

---

## 6. Role Middleware

### Create Middleware

```bash
php artisan make:middleware RoleMiddleware
```

### app/Http/Middleware/RoleMiddleware.php

```php
class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        if (!auth()->check() || auth()->user()->role !== $role) {
            abort(403);
        }

        return $next($request);
    }
}
```

### Register Middleware

```php
'role' => \App\Http\Middleware\RoleMiddleware::class,
```

---

## 7. Route Structure

### Separate Route Files

```
routes/
├── web.php
├── admin.php
├── instructor.php
```

---

### routes/admin.php

```php
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/', AdminDashboardController::class);
        Route::resource('users', AdminUserController::class);
        Route::resource('courses', AdminCourseController::class);
        Route::resource('orders', AdminOrderController::class);
    });
```

---

### routes/instructor.php

```php
Route::middleware(['auth', 'role:instructor'])
    ->prefix('instructor')
    ->group(function () {
        Route::get('/', InstructorDashboardController::class);
        Route::resource('courses', InstructorCourseController::class);
        Route::resource('lessons', InstructorLessonController::class);
    });
```

---

### routes/web.php (Students)

```php
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', StudentDashboardController::class);
    Route::get('/courses/{course}', CourseViewController::class);
    Route::get('/lessons/{lesson}', LessonWatchController::class);
    Route::get('/profile', ProfileController::class);
});
```

---

## 8. Login Redirect by Role

### Override Login Response

```php
protected function authenticated(Request $request, User $user)
{
    return match ($user->role) {
        'admin' => redirect('/admin'),
        'instructor' => redirect('/instructor'),
        default => redirect('/dashboard'),
    };
}
```

---

## 9. Dashboard Responsibilities

### Admin

* Manage users (admins, instructors, students)
* Approve & moderate courses
* View revenue & analytics
* Manage payments, invoices, coupons
* System configuration

### Instructor

* Create & manage own courses
* Upload lessons
* View enrolled students
* See revenue stats (optional)

### Student

* Browse courses
* Enroll & learn
* Track progress
* Manage profile

---

## 10. Admin Dashboard Menu Definition

### menuItems.json

```json
{
  "dashboard": {
    "label": "Dashboard",
    "icon": "layout-dashboard",
    "route": "/admin"
  },
  "users": {
    "label": "Users",
    "icon": "users",
    "children": [
      { "label": "Admins", "route": "/admin/users/admins" },
      { "label": "Instructors", "route": "/admin/users/instructors" },
      { "label": "Students", "route": "/admin/users/students" }
    ]
  },
  "courses": {
    "label": "Courses",
    "icon": "book-open",
    "children": [
      { "label": "All Courses", "route": "/admin/courses" },
      { "label": "Pending Approval", "route": "/admin/courses/pending" },
      { "label": "Published Courses", "route": "/admin/courses/published" }
    ]
  },
  "enrollments": {
    "label": "Enrollments",
    "icon": "graduation-cap",
    "children": [
      { "label": "All Enrollments", "route": "/admin/enrollments" }
    ]
  },
  "orders": {
    "label": "Orders & Payments",
    "icon": "credit-card",
    "children": [
      { "label": "Orders", "route": "/admin/orders" },
      { "label": "Payments", "route": "/admin/payments" },
      { "label": "Invoices", "route": "/admin/invoices" },
      { "label": "Coupons", "route": "/admin/coupons" }
    ]
  },
  "analytics": {
    "label": "Analytics",
    "icon": "bar-chart",
    "children": [
      { "label": "Revenue", "route": "/admin/analytics/revenue" },
      { "label": "Top Courses", "route": "/admin/analytics/courses" },
      { "label": "User Growth", "route": "/admin/analytics/users" }
    ]
  },
  "settings": {
    "label": "Settings",
    "icon": "settings",
    "children": [
      { "label": "General", "route": "/admin/settings/general" },
      { "label": "Payments", "route": "/admin/settings/payments" },
      { "label": "Notifications", "route": "/admin/settings/notifications" }
    ]
  }
}
```

---

## 11. Admin Dashboard Widgets

Required widgets:

* Total Revenue
* Active Students
* Total Courses
* Orders Today
* Monthly Revenue Chart
* Pending Course Approvals
* Recent Orders
* New Instructor Requests

---

## 12. Engineering Rules (Must Follow)

* All permissions handled via **policies**
* No role logic inside Blade templates
* Admin override via `Gate::before`
* Instructor access always ownership-based
* Student access always enrollment-based
* Menu generated from JSON (not hardcoded)

---

## END OF INSTRUCTIONS
