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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
