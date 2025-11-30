<?php

require __DIR__ . '/auth.php';
require __DIR__ . '/errors.php';
require __DIR__ . '/authenticated.php';

use App\Http\Controllers\ContactsController;
use App\Http\Controllers\StaticPagesController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest.redirect')->group(function () {
    Route::get('/', [StaticPagesController::class, 'home'])->name('home.index');

    Route::get('/benefits', [StaticPagesController::class, 'benefits'])->name('benefits.index');

    Route::get('/team', [StaticPagesController::class, 'team'])->name('team.index');
});


Route::get('/contacts', [ContactsController::class, 'index'])->name('contacts.index');
Route::post('/contacts', [ContactsController::class, 'send'])->name('contacts.send');

Route::get('/about', [StaticPagesController::class, 'about'])->name('about.index');

Route::get('/partners', [StaticPagesController::class, 'partners'])->name('partners.index');
