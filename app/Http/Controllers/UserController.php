<?php

namespace App\Http\Controllers;

use App\Enums\LogType;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Services\UserService;
use App\Traits\LogsActivity;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use LogsActivity;

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

        $this->logActivity("Perfil do utilizador atualizado", LogType::AUTH, [
            'user_id' => $user->id,
            'data' => $request->validated()
        ]);

        return redirect()->back()->with('success', 'Perfil atualizado com sucesso.');
    }
}
