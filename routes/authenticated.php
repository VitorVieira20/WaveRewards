<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.redirect')->group(function () {
    // DASHBOARD -> AUTHENTICATED HOME PAGE
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
});
