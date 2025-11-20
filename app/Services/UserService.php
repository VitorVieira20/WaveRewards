<?php

namespace App\Services;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Throwable;

class UserService
{
    public function __construct(protected UserRepository $userRepository)
    {
    }


    public function create(CreateUserRequest $request)
    {
        $data = $request->validated();

        try {
            return DB::transaction(function () use ($data) {
                $user = $this->userRepository->create([
                    'name' => $data['name'],
                    'username' => strtolower(str_replace(' ', '_', $data['name'])),
                    'avatar' => 'images/team/vitor.png',
                    'email' => $data['email'],
                    'address' => 'Funchal',
                    'password' => Hash::make($data['password']),
                ]);

                Log::info('New User created.', [
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'timestamp' => now()->toDateTimeString(),
                ]);

                return $user;
            });
        } catch (Throwable $e) {
            Log::error('Error while creating User.', [
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'input_data' => [
                    'name' => $data['name'] ?? null,
                    'email' => $data['email'] ?? null,
                ],
                'timestamp' => now()->toDateTimeString(),
            ]);

            return null;
        }
    }


    public function updateProfile(UpdateProfileRequest $request, User $user)
    {
        $data = $request->validated();

        try {
            return DB::transaction(function () use ($data, $user) {
                if (!empty($data)) {
                    $user->update($data);

                    Log::info('User Profile Updated.', [
                        'user_id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'username' => $user->username,
                        'address' => $user->address,
                        'timestamp' => now()->toDateTimeString(),
                    ]);
                } else {
                    Log::info('User tried to update profile but no new data was passed', [
                        'user_id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'username' => $user->username,
                        'address' => $user->address,
                        'timestamp' => now()->toDateTimeString(),
                    ]);
                }

                return $user;
            });
        } catch (Throwable $e) {
            Log::error('Error while updating User Profile.', [
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'input_data' => [
                    'name' => $data['name'] ?? null,
                    'email' => $data['email'] ?? null,
                    'username' => $data['username'] ?? null,
                    'address' => $data['address'] ?? null,
                ],
                'timestamp' => now()->toDateTimeString(),
            ]);

            return null;
        }
    }
}