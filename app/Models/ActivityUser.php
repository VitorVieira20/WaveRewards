<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ActivityUser extends Pivot
{
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
        'points'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];


    protected static function booted()
    {
        static::saving(function ($userActivity) {
            $userActivity->points = self::calculatePoints($userActivity);
        });
    }


    private static function calculatePoints($data): int
    {
        // Exemplo:
        // 5 ponto por minuto +
        // 0.1 ponto por metro +
        // 0.05 ponto por Kcal +
        // 50 pontos extra se esforço > 8

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