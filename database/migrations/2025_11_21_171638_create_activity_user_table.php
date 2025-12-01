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
        Schema::create('activity_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('activity_id')->nullable()->constrained()->onDelete('cascade');

            $table->integer('distance')->default(0);
            $table->integer('practice_time')->nullable();
            $table->integer('wasted_calories')->nullable();
            $table->integer('frequency')->nullable();
            $table->integer('effort')->nullable();
            $table->text('observations')->nullable();
            $table->integer('points')->default(0);
            $table->boolean('counts_for_goal')->default(true);
            $table->string('custom_title')->nullable();
            $table->string('custom_location')->nullable();
            $table->string('custom_conditions')->nullable();
            $table->string('custom_equipment')->nullable();
            $table->decimal('trash_collected', 8, 2)->default(0);
            $table->string('photo_path')->nullable();
            $table->dateTime('performed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_user');
    }
};
