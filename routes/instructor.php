<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'role:instructor'])
    ->prefix('instructor')
    ->group(function () {
        Route::get('/', \App\Http\Controllers\Instructor\InstructorDashboardController::class);
        Route::resource('courses', \App\Http\Controllers\Instructor\InstructorCourseController::class);
        Route::resource('lessons', \App\Http\Controllers\Instructor\InstructorLessonController::class);
    });

