<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::fallback(function () {
    return Inertia::render('Errors/404')->toResponse(request())->setStatusCode(404);
});