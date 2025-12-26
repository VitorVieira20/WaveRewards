<?php

namespace App\Http\Controllers\Auth;

use App\Enums\LogType;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Settings;
use App\Traits\LogsActivity;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    use LogsActivity;

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::where('google_id', $googleUser->id)
                    ->orWhere('email', $googleUser->email)
                    ->first();

        if ($user) {
            $this->logActivity("Login via Google realizado", LogType::AUTH, ['user_id' => $user->id]);
            if (!$user->google_id) {
                $user->update(['google_id' => $googleUser->id]);
            }
        } else {
            $baseUsername = strtolower(str_replace(' ', '_', $googleUser->name));
            do {
                $username = $baseUsername . '_' . rand(1000, 9999);
            } while (User::where('username', $username)->exists());

            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'username' => $username,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
                'email_verified_at' => now(),
                'address' => 'Funchal',
            ]);

            $this->logActivity("Novo utilizador registado via Google", LogType::AUTH, [
                'email' => $googleUser->email
            ]);

            Settings::firstOrCreate(['user_id' => $user->id]);
        }

        Auth::login($user);
        request()->session()->regenerate();

        return redirect()->route('home.index');
    }
}