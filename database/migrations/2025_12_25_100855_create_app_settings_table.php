<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();
            
            // Application Information
            $table->string('app_name')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('mobile_logo_url')->nullable();
            $table->text('app_description')->nullable();
            $table->text('app_information')->nullable(); // For the modal/info display
            
            // Social Links
            $table->string('facebook_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('youtube_url')->nullable();
            
            // Contact Information
            $table->string('email')->nullable();
            $table->json('phone_numbers')->nullable(); // Array of phone numbers
            $table->text('address')->nullable();
            
            // Footer Quick Links
            $table->json('quick_links')->nullable(); // Array of {label, href}
            
            // Environment Settings
            $table->string('environment')->default('production');
            $table->boolean('maintenance_mode')->default(false);
            $table->text('maintenance_message')->nullable();
            
            // App Settings
            $table->string('timezone')->default('UTC');
            $table->string('locale')->default('en');
            $table->string('currency')->default('USD');
            $table->string('currency_symbol')->default('$');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_settings');
    }
};
