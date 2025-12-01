<?php

namespace App\Http\Controllers;

use App\Http\Requests\Activity\CreateActivityLogRequest;
use App\Services\ActivityUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityUserController extends Controller
{
    public function __construct(protected ActivityUserService $activityUserService)
    {
    }


    public function store(CreateActivityLogRequest $request)
    {
        $activity = $this->activityUserService->registerActivity(
            $request->user(),
            $request->validated()
        );

        if (!$activity) {
            return back()->with('error', 'Ocorreu um erro ao registar a atividade.');
        }

        if (!session()->has('daily_goal')) {
            return redirect()->route('activities.show', $activity->activity_id)
                ->with('activity_completed', [
                    'status' => 'completed',
                    'points' => $activity->points
                ]);
        }

        return redirect()->route('dashboard.index');
        //return redirect()->route('dashboard.index')->with('success', "Atividade registada! Ganhaste {$activity->points} pontos.");

    }


    public function activityHistory(Request $request)
    {
        $user = Auth::user();

        $activities = $this->activityUserService->getUserHistory($user->id);

        return Inertia::render("Authenticated/Activities/History", [
            'activities' => $activities
        ]);
    }
}
