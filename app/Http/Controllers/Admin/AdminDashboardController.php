<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        // TODO: Load dashboard widgets data
        return Inertia::render('admin/dashboard', [
            'menuItems' => json_decode(file_get_contents(resource_path('js/data/menuItems.json')), true),
        ]);
    }
}
