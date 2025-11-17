<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\MeteorologyController;
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
});
