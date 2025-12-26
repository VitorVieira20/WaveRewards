<?php

namespace App\Http\Controllers\Auth;

use App\Enums\LogType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Traits\LogsActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    use LogsActivity;

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
            $this->logActivity(
                "Tentativa de login: Email pendente de verificação",
                LogType::AUTH,
                ['email' => $validated['email']]
            );
            return redirect()->route('auth.index', 'login')->with('error', 'Email não verificado!');
        }

        if (!Auth::attempt($validated)) {
            $this->logActivity(
                "Falha na autenticação: Credenciais incorretas",
                LogType::AUTH,
                ['email' => $validated['email']]
            );
            return redirect()->route('auth.index', 'login')->with('error', 'Credenciais Erradas!');
        }

        $this->logActivity(
            "Utilizador autenticado com sucesso",
            LogType::AUTH
        );

        $request->session()->regenerate();

        return redirect()->route('home.index', ['home' => true]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {

        $this->logActivity(
            "Utilizador terminou a sessão (Logout)",
            LogType::AUTH
        );

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
