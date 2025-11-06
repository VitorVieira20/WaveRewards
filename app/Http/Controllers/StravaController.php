<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;

class StravaController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('strava')
            ->scopes(['read_all', 'activity:read_all'])
            ->redirect();
    }


    public function callback()
    {
        $stravaUser = Socialite::driver('strava')->user();

        $user = Auth::user();
        $user->stravaAccount()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'strava_id' => $stravaUser->getId(),
                'strava_nickname' => $stravaUser->getNickname(),
                'strava_token' => $stravaUser->token,
                'strava_refresh_token' => $stravaUser->refreshToken,
                'strava_expires_in' => $stravaUser->expiresIn,
            ]
        );


        return redirect('/')->with('success', 'Conta Strava ligada com sucesso!');
    }
}
