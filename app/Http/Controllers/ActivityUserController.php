<?php

namespace App\Http\Controllers;

use App\Http\Requests\Activity\CreateActivityLogRequest;
use App\Http\Requests\Activity\CreateFreeActivityLogRequest;
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
    }


    public function storeFree(CreateFreeActivityLogRequest $request)
    {
        $validated = $request->validated();

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('activity_photos', 'public');
            $photoPath = 'storage/' . $photoPath;
        }

        $performedAt = $validated['date'] . ' ' . $validated['start_time'];

        $activity = $this->activityUserService->registerActivity($request->user(), array_merge($validated, [
            'custom_title' => $validated['custom_title'],
            'custom_location' => $validated['custom_title'],
            'custom_conditions' => $validated['custom_title'],
            'custom_equipment' => $validated['custom_title'],
            'trash_collected' => $validated['trash_collected'] ?? 0,
            'photo_path' => $photoPath,
            'performed_at' => $performedAt,
        ]));

        if (!$activity) {
            return back()->with('error', 'Ocorreu um erro ao registar a atividade.');
        }

        if (!session()->has('daily_goal')) {
            return redirect()->route('activities.free')
                ->with('activity_completed', [
                    'status' => 'completed',
                    'points' => $activity->points
                ]);
        }

        return redirect()->route('dashboard.index');
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
