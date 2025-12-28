<?php

namespace App\Providers;

use App\Models\AppSetting;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Override config values from database settings
        try {
            $settings = AppSetting::getSettings();
            
            // Override timezone if set in database
            if ($settings->timezone) {
                config(['app.timezone' => $settings->timezone]);
            }
            
            // Override locale if set in database
            if ($settings->locale) {
                config(['app.locale' => $settings->locale]);
            }
            
            // Override environment if set in database
            if ($settings->environment) {
                config(['app.env' => $settings->environment]);
            }
            
            // Set currency in config if needed (you may need to create this config key)
            if ($settings->currency) {
                config(['app.currency' => $settings->currency]);
            }
            
            if ($settings->currency_symbol) {
                config(['app.currency_symbol' => $settings->currency_symbol]);
            }
        } catch (\Exception $e) {
            // Silently fail if database is not available or settings table doesn't exist yet
            // This prevents issues during migrations or when the table hasn't been created
        }
    }
}
