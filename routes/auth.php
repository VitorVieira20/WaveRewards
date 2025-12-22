<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\StravaController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest.redirect')->group(function () {
    // GOOGLE OAUTH AUTHENTICATION
    Route::get('auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);


    // BASIC AUTHENTICATION
    Route::get('/auth/{method}', [AuthenticatedSessionController::class, 'auth'])->name('auth.index');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
    Route::post('/signup', [RegisterUserController::class, 'store'])->name('signup.store');


    // FORGOT AND RESET PASSWORD
    Route::get('/forgot-password', [ForgotPasswordController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'store'])->name('password.email');

    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'store'])->name('password.store');
});

Route::middleware('auth.redirect')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


// STRAVA OAUTH
Route::get('/auth/strava/redirect', [StravaController::class, 'redirect'])->name('strava.redirect');
Route::get('/auth/strava/callback', [StravaController::class, 'callback'])->name('strava.callback');