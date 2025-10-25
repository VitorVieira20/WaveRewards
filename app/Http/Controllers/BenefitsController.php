<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BenefitsController extends Controller
{
    public function index()
    {
        return Inertia::render('Benefits');
    }
}
