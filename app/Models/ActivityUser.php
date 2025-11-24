<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

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
        'created_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
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
            }
        });

        static::deleted(function ($userActivity) {
            if ($userActivity->user_id) {
                $userActivity->user()->decrement('total_points', $userActivity->points);
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
}