<?php

require __DIR__ . '/auth.php';
require __DIR__ . '/errors.php';

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/login', function() { return Inertia::render('Login'); })->name('login.index');