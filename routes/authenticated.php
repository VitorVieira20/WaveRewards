<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityUserController;
use App\Http\Controllers\Auth\UpdatePasswordController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InformationsController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\MeteorologyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RankingsController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TutorialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.redirect')->group(function () {
    // DASHBOARD -> AUTHENTICATED HOME PAGE
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');


    // RANKINGS
    Route::get('/rankings', [RankingsController::class, 'index'])->name('rankings.index');


    // METEOROLOGY
    Route::get('/meteorology', [MeteorologyController::class, 'index'])->name('meteorology.index');


    // LIBRARY
    Route::get('/library', [LibraryController::class, 'index'])->name('library.index');


    // WORKSHOPS
    Route::get('/workshops', [WorkshopController::class, 'index'])->name('workshops.index');
    Route::get('/workshops/{id}', [WorkshopController::class, 'show'])->name('workshops.show');
    Route::post('/workshops/register/{workshopId}', [WorkshopController::class, 'registerUser'])->name('workshops.register');


    // VIDEOS/TUTORIALS
    Route::get('/tutorials', [TutorialController::class, 'index'])->name('tutorials.index');
    Route::get('/tutorials/{id}', [TutorialController::class, 'show'])->name('tutorials.show');


    // INFORMATIONS PANEL
    Route::get('/informations', [InformationsController::class, 'index'])->name('informations.index');
    Route::get('/informations/{id}', [InformationsController::class, 'show'])->name('informations.show');


    // ACTIVITIES
    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
    Route::get('/activities/category/{category}', [ActivityController::class, 'indexByCategory'])->name('activities.indexByCategory');
    Route::get('/activities/history', [ActivityUserController::class, 'activityHistory'])->name('activities.history');
    Route::get('/activities/{id}', [ActivityController::class, 'show'])->name('activities.show');
    Route::post('/activities/user', [ActivityUserController::class, 'store'])->name('activities.user.create');


    // PROFILE
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');


    // CHANGE PASSWORD
    Route::put('/profile/password', [UpdatePasswordController::class, 'store'])->name('profile.password.update');


    // SETTINGS
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingsController::class, 'update'])->name('settings.update');
    Route::put('/settings/profile', [UserController::class, 'updateProfile'])->name('settings.profile.update');


    // CHAT
    Route::get('/chat/token/{team}', [ChatController::class, 'getToken'])->name('chat.token');
    Route::get('/chat/messages/{team}', [ChatController::class, 'index'])->name('chat.history');
});
