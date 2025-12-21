<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }


    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = Auth::user();

        $updated = $this->userService->updateProfile($request, $user);

        if (!$updated) {
            return redirect()->back()->with('error', 'Não foi possível atualizar o perfil. Tente mais tarde.');
        }

        return redirect()->back()->with('success', 'Perfil atualizado com sucesso.');
    }
}
