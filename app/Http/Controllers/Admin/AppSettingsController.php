<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'mobile_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'logo_url' => 'nullable|string|max:500',
            'mobile_logo_url' => 'nullable|string|max:500',
            'app_description' => 'nullable|string',
            'app_information' => 'nullable|string',
            'copyright_text' => 'nullable|string',
            
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
        $updateData = $validated;

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists (only if it's a stored file, not a URL)
            if ($settings->logo_url && !filter_var($settings->logo_url, FILTER_VALIDATE_URL) && Storage::disk('public')->exists($settings->logo_url)) {
                Storage::disk('public')->delete($settings->logo_url);
            }
            
            $logoPath = $request->file('logo')->store('logos', 'public');
            $updateData['logo_url'] = $logoPath;
        }

        // Handle mobile logo upload
        if ($request->hasFile('mobile_logo')) {
            // Delete old mobile logo if exists (only if it's a stored file, not a URL)
            if ($settings->mobile_logo_url && !filter_var($settings->mobile_logo_url, FILTER_VALIDATE_URL) && Storage::disk('public')->exists($settings->mobile_logo_url)) {
                Storage::disk('public')->delete($settings->mobile_logo_url);
            }
            
            $mobileLogoPath = $request->file('mobile_logo')->store('logos', 'public');
            $updateData['mobile_logo_url'] = $mobileLogoPath;
        }

        // Remove file inputs from update data if they weren't uploaded
        unset($updateData['logo'], $updateData['mobile_logo']);

        $settings->update($updateData);

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}
