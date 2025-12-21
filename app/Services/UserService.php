<?php

namespace App\Services;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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


    public function updateProfile(UpdateProfileRequest $request, User $user): bool
    {
        try {
            if ($request->hasFile('avatar')) {
                if ($user->avatar && !str_contains($user->avatar, 'default-avatar')) {
                    $oldPath = str_replace(asset('storage/'), '', $user->avatar);
                    Storage::disk('public')->delete($oldPath);
                }

                // Guardar o novo ficheiro
                $path = $request->file('avatar')->store('avatars', 'public');
                $user->avatar = asset('storage/' . $path);
            }

            if ($request->has('name'))
                $user->name = $request->name;
            if ($request->has('username'))
                $user->username = $request->username;
            if ($request->has('email'))
                $user->email = $request->email;
            if ($request->has('address'))
                $user->address = $request->address;

            return $user->save();
        } catch (Exception $e) {
            return false;
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