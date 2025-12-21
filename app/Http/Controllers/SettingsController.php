<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use App\Services\UserService;
use DateTimeZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function __construct(
        protected SettingsService $settingsService,
        protected UserService $userService
    ) {
    }


    public function index()
    {
        $user = Auth::user();
        $stravaAccount = $user->stravaAccount;
        $settings = $this->settingsService->getSettings();

        $timezones = collect(DateTimeZone::listIdentifiers())
            ->map(fn($tz) => [
                'value' => $tz,
                'label' => $tz
            ]);

        return Inertia::render("Authenticated/Settings", [
            'user' => $user,
            'isStravaConnected' => (bool) $stravaAccount,
            'settings' => $settings,
            'timezones' => $timezones
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


    public function export()
    {
        $pdf = $this->userService->exportUserData(Auth::user());
        return $pdf->download('meus_dados_waverewards.pdf');
    }


    public function destroy(Request $request)
    {
        $user = Auth::user();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $this->userService->deleteAccount($user);

        return redirect()->route('auth.index', 'login')->with('success', 'A sua conta foi eliminada permanentemente.');
    }
}