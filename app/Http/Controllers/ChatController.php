<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function getToken(Team $team)
    {
        $user = Auth::user();

        if (!$team->users()->where('user_id', $user->id)->exists()) {
            return redirect()->route('home.index')->with('error', 'Não pertence a esta equipa ou esta não existe!');
        }

        $payload = [
            'sub' => $user->id,
            'name' => $user->name,
            'avatar' => $user->avatar,
            'team_id' => $team->id,
            'iat' => now()->timestamp,
            'exp' => now()->addHours(8)->timestamp,
        ];

        $token = JWT::encode($payload, env('CHAT_SECRET_KEY'), 'HS256');

        return response()->json(['token' => $token]);
    }


    public function index(Team $team)
    {
        if (!Auth::user()->teams()->where('teams.id', $team->id)->exists()) {
            return redirect()->route('home.index')->with('error', 'Não pertence a esta equipa ou esta não existe!');
        }

        $messages = $team->messages()
            ->with('user:id,name,avatar')
            ->latest()
            ->take(50)
            ->get()
            ->reverse()
            ->values();

        return response()->json($messages);
    }
}
