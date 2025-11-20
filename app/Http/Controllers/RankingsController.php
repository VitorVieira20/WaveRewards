<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class RankingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Authenticated/Rankings');
    }
}
