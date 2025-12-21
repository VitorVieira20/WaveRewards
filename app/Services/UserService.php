<?php

namespace App\Services;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Throwable;

class UserService
{
    public function __construct(
        protected UserRepository $userRepository,
        protected ActivityService $activityService,
        protected BadgeService $badgeService
    ) {
    }


    public function create(CreateUserRequest $request)
    {
        $data = $request->validated();

        $defaultAvatars = [
            'images/avatars/avatar1.png',
            'images/avatars/avatar2.png',
            'images/avatars/avatar3.png',
            'images/avatars/avatar4.png',
        ];

        $baseUsername = strtolower(str_replace(' ', '_', $data['name']));

        do {
            $username = $baseUsername . '_' . rand(1000, 9999);
        } while (User::where('username', $username)->exists());

        $avatar = $defaultAvatars[array_rand($defaultAvatars)];

        try {
            return DB::transaction(function () use ($data, $username, $avatar) {
                $user = $this->userRepository->create([
                    'name' => $data['name'],
                    'username' => $username,
                    'avatar' => $avatar,
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


    public function exportUserData(User $user)
    {

        $globalStats = $this->activityService->getUserGlobalStats($user);
        $formattedStats = $this->activityService->getUserStats($globalStats);

        $allActivities = DB::table('activity_user')
            ->leftJoin('activities', 'activity_user.activity_id', '=', 'activities.id')
            ->where('activity_user.user_id', $user->id)
            ->select(
                'activity_user.*',
                'activities.title as base_title'
            )
            ->orderBy('activity_user.performed_at', 'desc')
            ->get();

        $data = [
            'user' => $user,
            'stats' => $formattedStats,
            'workshops' => $user->workshops()->withPivot('created_at')->get(),
            'activities' => $allActivities, // Lista completa: Predefinidas + Livres
            'badges' => $user->badges()->get(),
            'generated_at' => now()->format('d/m/Y H:i')
        ];

        return Pdf::loadView('pdf.user_data', $data);
    }
}