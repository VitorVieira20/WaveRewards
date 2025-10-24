<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|exists:users,email',
            'password' => 'required',
        ], [
            'username.required' => 'O email é obrigatório.',
            'username.exists' => 'O email não existe.',
            'password.required' => 'A palavra-passe é obrigatória.',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->route('auth.index', 'login')
                ->withErrors($validator)
                ->withInput();
        }

        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request->email)->first();

        if (!$user->email_verified_at) {
            return redirect()->route('auth.index', 'login')->with('error', 'Email não verificado!');
        }

        if (!Auth::attempt($credentials)) {
            return redirect()->route('auth.index', 'login')->with('error', 'Credenciais Erradas!');
        }

        $request->session()->regenerate();

        return redirect()->route('home.index');
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
