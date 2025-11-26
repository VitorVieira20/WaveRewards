<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('email_notifications')->default(false);
            $table->boolean('push_notifications')->default(false);
            $table->boolean('weekly_digest')->default(false);
            $table->boolean('challenge_alerts')->default(false);
            $table->boolean('team_notifications')->default(false);
            $table->boolean('public_profile')->default(false);
            $table->boolean('share_activities')->default(false);
            $table->boolean('share_location')->default(false);
            $table->string('language')->default('km');
            $table->string('distance_unit')->default('pt');
            $table->string('temperature_unit')->default('c');
            $table->string('timezone')->default('Europe/Lisbon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
