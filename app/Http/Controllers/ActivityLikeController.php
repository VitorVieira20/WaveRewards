<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Support\Facades\Auth;

class ActivityLikeController extends Controller
{
    public function toggle(Activity $activity)
    {
        Auth::user()->likedActivities()->toggle($activity->id);

        return back();
    }
}