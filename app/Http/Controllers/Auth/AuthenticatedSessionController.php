<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function auth(Request $request, string $method)
    {
        return Inertia::render('Auth', [
            'status' => $request->session()->get('status'),
            'method' => $method,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (!$user->email_verified_at) {
            return redirect()->route('auth.index', 'login')->with('error', 'Email não verificado!');
        }

        if (!Auth::attempt($validated)) {
            return redirect()->route('auth.index', 'login')->with('error', 'Credenciais Erradas!');
        }

        $request->session()->regenerate();

        return redirect()->route('home.index', ['home' => true]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
