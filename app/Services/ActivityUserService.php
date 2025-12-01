<?php

namespace App\Services;

use App\Models\ActivityUser;
use App\Models\User;
use App\Repositories\ActivityUserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class ActivityUserService
{
    public function __construct(protected ActivityUserRepository $activityUserRepository)
    {
    }


    public function registerActivity(User $user, array $data): ?ActivityUser
    {
        try {
            return DB::transaction(function () use ($user, $data) {
                $activityData = [
                    'user_id' => $user->id,
                    'activity_id' => $data['activity_id'] ?? null,
                    'distance' => $data['distance'],
                    'practice_time' => $data['practice_time'],
                    'wasted_calories' => $data['wasted_calories'],
                    'frequency' => $data['frequency'],
                    'effort' => $data['effort'],
                    'observations' => $data['observations'] ?? null,
                    'custom_title' => $data['custom_title'] ?? null,
                    'custom_location' => $data['custom_location'] ?? null,
                    'custom_conditions' => $data['custom_conditions'] ?? null,
                    'custom_equipment' => $data['custom_equipment'] ?? null,
                    'trash_collected' => $data['trash_collected'] ?? null,
                    'photo_path' => $data['photo_path'] ?? null,
                    'performed_at' => $data['performed_at'] ?? null,
                    'counts_for_goal' => $data['counts_for_goal'] ?? false,
                ];

                $userActivity = $this->activityUserRepository->create($activityData);

                Log::info('User performed an activity.', [
                    'user_id' => $user->id,
                    'activity_id' => $data['activity_id'] ?? null,
                    'points_earned' => $userActivity->points,
                    'timestamp' => now()->toDateTimeString(),
                ]);

                return $userActivity;
            });

        } catch (Throwable $e) {
            Log::error('Error while registering User Activity.', [
                'error_message' => $e->getMessage(),
                'user_id' => $user->id,
                'input_data' => $data,
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }


    public function getUserHistory(int $userId): array
    {
        $history = $this->activityUserRepository->getHistoryByUser($userId);

        return $history->map(function ($record) {
            return [
                'id' => $record->id,
                'activity_id' => $record->activity_id ?? null,
                'images' => collect($record->activity->images ?? [])->map(fn($img) => asset($img))->toArray(),
                'title' => $record->activity->title ?? null,
                'date' => $record->created_at->format('d/m/Y') ?? null,
                'points' => $record->points,
                'distance' => $record->distance . 'm',
                'calories' => $record->wasted_calories . 'kcal',
                'custom_title' => $record->custom_title ?? null,
                'custom_location' => $record->custom_location ?? null,
                'custom_conditions' => $record->custom_conditions ?? null,
                'custom_equipment' => $record->custom_equipment ?? null,
                'trash_collected' => $record->trash_collected ?? null,
                'image' => $record->photo_path ? asset($record->photo_path) : null,
                'performed_at' => $record->performed_at ? $record->performed_at->format('d/m/Y') : null,
            ];
        })->toArray();
    }
}