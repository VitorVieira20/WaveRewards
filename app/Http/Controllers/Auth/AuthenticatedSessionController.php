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
    public function create(Request $request)
    {
        return Inertia::render('Auth/Login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|exists:users,username',
            'password' => 'required',
        ], [
            'username.required' => 'O nome de utilizador é obrigatório.',
            'username.exists' => 'O nome de utilizador não existe.',
            'password.required' => 'A palavra-passe é obrigatória.',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->route('login')
                ->withErrors($validator)
                ->withInput();
        }

        $credentials = $request->only('username', 'password');

        $user = User::where('username', $request->username)->first();

        if (!$user->email_verified_at) {
            return redirect()->route('login')->with('error', 'Email não verificado!');
        }

        if (!Auth::attempt($credentials)) {
            return redirect()->route('login')->with('error', 'Credenciais Erradas!');
        }

        $request->session()->regenerate();

        return redirect()->route('dashboard.index');
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
