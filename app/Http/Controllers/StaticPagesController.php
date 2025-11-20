<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPagesController extends Controller
{
    public function home(Request $request)
    {
        return Inertia::render('Home', [
            'hero' => $request->boolean('hero')
        ]);
    }


    public function about()
    {
        return Inertia::render('AboutUs');
    }


    public function benefits()
    {
        return Inertia::render('Benefits');
    }


    public function team()
    {
        return Inertia::render('Team');
    }


    public function partners()
    {
        return Inertia::render('Partners');
    }
}
