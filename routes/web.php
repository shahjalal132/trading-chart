<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/course/details', function () {
    return Inertia::render('course/details');
})->name('course.details');

Route::get('/faq', function () {
    return Inertia::render('faq');
})->name('faq');

Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');

Route::get('/checkout', function () {
    return Inertia::render('checkout');
})->name('checkout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', \App\Http\Controllers\Student\StudentDashboardController::class)->name('dashboard');
    // TODO: Add student routes when controllers are created
    // Route::get('/courses/{course}', \App\Http\Controllers\Student\CourseViewController::class);
    // Route::get('/lessons/{lesson}', \App\Http\Controllers\Student\LessonWatchController::class);
    // Route::get('/profile', \App\Http\Controllers\ProfileController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/instructor.php';
require __DIR__ . '/Api/V1/routes.php';
require __DIR__ . '/ai.php';
