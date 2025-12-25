<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppSettingsController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index(Request $request): Response
    {
        $settings = AppSetting::getSettings();
        
        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the application settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // Application Information
            'app_name' => 'nullable|string|max:255',
            'logo_url' => 'nullable|string|max:500',
            'mobile_logo_url' => 'nullable|string|max:500',
            'app_description' => 'nullable|string',
            'app_information' => 'nullable|string',
            
            // Social Links
            'facebook_url' => 'nullable|url|max:500',
            'twitter_url' => 'nullable|url|max:500',
            'instagram_url' => 'nullable|url|max:500',
            'linkedin_url' => 'nullable|url|max:500',
            'youtube_url' => 'nullable|url|max:500',
            
            // Contact Information
            'email' => 'nullable|email|max:255',
            'phone_numbers' => 'nullable|array',
            'phone_numbers.*' => 'string|max:50',
            'address' => 'nullable|string',
            
            // Quick Links
            'quick_links' => 'nullable|array',
            'quick_links.*.label' => 'required_with:quick_links|string|max:255',
            'quick_links.*.href' => 'required_with:quick_links|string|max:500',
            
            // Environment Settings
            'environment' => 'nullable|string|in:local,staging,production',
            'maintenance_mode' => 'nullable|boolean',
            'maintenance_message' => 'nullable|string',
            
            // App Settings
            'timezone' => 'nullable|string|max:100',
            'locale' => 'nullable|string|max:10',
            'currency' => 'nullable|string|max:10',
            'currency_symbol' => 'nullable|string|max:10',
        ]);

        $settings = AppSetting::getSettings();
        $settings->update($validated);

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}
