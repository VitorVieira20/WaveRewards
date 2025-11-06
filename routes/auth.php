<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\StravaController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest.redirect')->group(function () {
    Route::get('/auth/{method}', [AuthenticatedSessionController::class, 'auth'])->name('auth.index');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
    Route::post('/signup', [RegisterUserController::class, 'store'])->name('signup.store');
});

Route::middleware('auth.redirect')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


Route::get('/auth/strava/redirect', [StravaController::class, 'redirect'])->name('strava.redirect');
Route::get('/auth/strava/callback', [StravaController::class, 'callback'])->name('strava.callback');