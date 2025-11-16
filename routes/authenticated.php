<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\MeteorologyController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.redirect')->group(function () {
    // DASHBOARD -> AUTHENTICATED HOME PAGE
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');


    // METEOROLOGY
    Route::get('/meteorology', [MeteorologyController::class, 'index'])->name('meteorology.index');


    // LIBRARY
    Route::get('/library', [LibraryController::class, 'index'])->name('library.index');

});
