<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Log;

class ActivityUser extends Pivot
{
    protected $table = 'activity_user';

    public $incrementing = true;

    protected $fillable = [
        'user_id',
        'activity_id',
        'distance',
        'practice_time',
        'wasted_calories',
        'frequency',
        'effort',
        'observations',
        'points',
        'counts_for_goal',
        'custom_title',
        'custom_location',
        'custom_conditions',
        'custom_equipment',
        'trash_collected',
        'photo_path',
        'performed_at',
        'created_at'
    ];

    protected $casts = [
        'performed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'counts_for_goal' => 'boolean',
    ];

    protected static function booted()
    {
        static::saving(function ($userActivity) {
            if (empty($userActivity->points)) {
                $userActivity->points = self::calculatePoints($userActivity);
            }
        });

        static::created(function ($userActivity) {
            if ($userActivity->user_id) {
                $userActivity->user()->increment('total_points', $userActivity->points);

                if ($userActivity->counts_for_goal) {
                    self::updateDailyProgress($userActivity);
                }
            }
        });

        static::deleted(function ($userActivity) {
            if ($userActivity->user_id) {
                $userActivity->user()->decrement('total_points', $userActivity->points);
                self::decrementDailyProgress($userActivity);
            }
        });
    }

    public static function calculatePoints($data): int
    {
        $points = ($data->practice_time * 5)
            + ($data->distance * 0.1)
            + ($data->wasted_calories * 0.05);

        if ($data->effort >= 8) {
            $points += 50;
        }

        return (int) round($points);
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function updateDailyProgress($activity)
    {
        $dailyTarget = 5000;

        $goal = DailyGoal::firstOrCreate(
            [
                'user_id' => $activity->user_id,
                'date' => $activity->created_at->format('Y-m-d')
            ],
            [
                'target_distance' => $dailyTarget,
                'current_distance' => 0
            ]
        );

        $goal->current_distance += $activity->distance;

        if (!$goal->is_completed && $goal->current_distance >= $goal->target_distance) {
            $goal->is_completed = true;

            // Pontos por ter concluído o objetivo diário
            $activity->user()->increment('total_points', 100);

            session()->flash('daily_goal', [
                'status' => 'completed',
            ]);
        }

        $goal->save();
    }


    protected static function decrementDailyProgress($activity)
    {
        $goal = DailyGoal::where('user_id', $activity->user_id)
            ->where('date', $activity->created_at->format('Y-m-d'))
            ->first();

        if ($goal) {
            $goal->current_distance = max(0, $goal->current_distance - $activity->distance);

            if ($goal->is_completed && $goal->current_distance < $goal->target_distance) {
                $goal->is_completed = false;
            }

            $goal->save();
        }
    }
}