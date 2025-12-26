<?php

namespace App\Http\Controllers;

use App\Enums\LogType;
use App\Http\Requests\Activity\CreateActivityLogRequest;
use App\Http\Requests\Activity\CreateFreeActivityLogRequest;
use App\Services\ActivityUserService;
use App\Services\BadgeService;
use App\Traits\LogsActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityUserController extends Controller
{
    use LogsActivity;

    public function __construct(
        protected ActivityUserService $activityUserService,
        protected BadgeService $badgeService
    ) {
    }


    public function store(CreateActivityLogRequest $request)
    {
        $user = $request->user();

        $activity = $this->activityUserService->registerActivity(
            $user,
            $request->validated()
        );

        if (!$activity) {
            return back()->with('error', 'Ocorreu um erro ao registar a atividade.');
        }

        $this->logActivity("Nova atividade registada", LogType::ACTIVITIES, ['user_id' => $user->id, 'activity' => $activity->id]);

        $newBadges = $this->badgeService->checkAchievements(Auth::user());

        if (!empty($newBadges)) {
            $this->logActivity("Nova(s) conquista(s) desbloqueada(s)", LogType::ACHIEVEMENTS, ['badges' => $newBadges]);

            return back()->with('new_badge', $newBadges);
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
        $user = $request->user();
        $validated = $request->validated();

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('activity_photos', 'public');
            $photoPath = 'storage/' . $photoPath;
        }

        $performedAt = $validated['date'] . ' ' . $validated['start_time'];

        $activity = $this->activityUserService->registerActivity($user, array_merge($validated, [
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

        $this->logActivity("Nova atividade livre registada", LogType::ACTIVITIES, ['user_id' => $user->id, 'activity' => $activity->id]);

        $newBadges = $this->badgeService->checkAchievements(Auth::user());

        if (!empty($newBadges)) {
            $this->logActivity("Nova(s) conquista(s) desbloqueada(s)", LogType::ACHIEVEMENTS, ['badges' => $newBadges]);

            return back()->with('new_badge', $newBadges);
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
