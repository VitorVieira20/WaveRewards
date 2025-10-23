<?php

require __DIR__ . '/auth.php';
require __DIR__ . '/errors.php';

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
