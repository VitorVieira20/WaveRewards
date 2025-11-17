<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InformationsController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\MeteorologyController;
use App\Http\Controllers\TutorialController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.redirect')->group(function () {
    // DASHBOARD -> AUTHENTICATED HOME PAGE
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');


    // METEOROLOGY
    Route::get('/meteorology', [MeteorologyController::class, 'index'])->name('meteorology.index');


    // LIBRARY
    Route::get('/library', [LibraryController::class, 'index'])->name('library.index');


    // WORKSHOPS
    Route::get('/workshops', [WorkshopController::class, 'index'])->name('workshops.index');
    Route::get('/workshops/{id}', [WorkshopController::class, 'show'])->name('workshops.show');


    // VIDEOS/TUTORIALS
    Route::get('/tutorials', [TutorialController::class, 'index'])->name('tutorials.index');
    Route::get('/tutorials/{id}', [TutorialController::class, 'show'])->name('tutorials.show');


    // INFORMATIONS PANEL
    Route::get('/informations', [InformationsController::class, 'index'])->name('informations.index');
    Route::get('/informations/{id}', [InformationsController::class, 'show'])->name('informations.show');


    // ACTIVITIES
    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
    Route::get('/activities/category/{category}', [ActivityController::class, 'indexByCategory'])->name('activities.indexByCategory');
    Route::get('/activities/{id}', [ActivityController::class, 'show'])->name('activities.show');
});
