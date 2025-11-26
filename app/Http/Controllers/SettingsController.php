<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function __construct(protected SettingsService $settingsService)
    {
    }


    public function index()
    {
        $user = Auth::user();
        $stravaAccount = $user->stravaAccount;
        $settings = $this->settingsService->getSettings();

        return Inertia::render("Authenticated/Settings", [
            'user' => $user,
            'isStravaConnected' => (bool) $stravaAccount,
            'settings' => $settings
        ]);
    }


    public function update(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'weekly_digest' => 'boolean',
            'challenge_alerts' => 'boolean',
            'team_notifications' => 'boolean',
            'public_profile' => 'boolean',
            'share_activities' => 'boolean',
            'share_location' => 'boolean',
            'language' => 'string',
            'distance_unit' => 'string',
            'temperature_unit' => 'string',
            'timezone' => 'string',
        ]);


        $field = key($validated);
        $value = $validated[$field];

        $this->settingsService->updateSetting($field, $value);

        return back();
    }
}