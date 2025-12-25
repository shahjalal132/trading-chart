<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'app_name',
        'logo_url',
        'mobile_logo_url',
        'app_description',
        'app_information',
        'copyright_text',
        'facebook_url',
        'twitter_url',
        'instagram_url',
        'linkedin_url',
        'youtube_url',
        'email',
        'phone_numbers',
        'address',
        'quick_links',
        'environment',
        'maintenance_mode',
        'maintenance_message',
        'timezone',
        'locale',
        'currency',
        'currency_symbol',
    ];

    protected function casts(): array
    {
        return [
            'phone_numbers' => 'array',
            'quick_links' => 'array',
            'maintenance_mode' => 'boolean',
        ];
    }

    /**
     * Get the first (or create) app setting instance.
     * Since we only need one settings record, this is a singleton pattern.
     */
    public static function getSettings(): self
    {
        return static::firstOrCreate(
            ['id' => 1],
            [
                'app_name' => config('app.name', 'Trading Chart'),
                'environment' => config('app.env', 'production'),
                'timezone' => config('app.timezone', 'UTC'),
                'locale' => config('app.locale', 'en'),
            ]
        );
    }
}
