<?php

use App\Http\Controllers\Api\V1\ChatController;
use Illuminate\Support\Facades\Route;

// API v1 routes with /api prefix
Route::prefix('api/v1')->name('api.v1.')->group(function () {
    Route::post('/chat', [ChatController::class, 'chat'])->name('chat');
});
