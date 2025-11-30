<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyGoal extends Model
{
    protected $fillable = [
        'user_id', 'date', 'current_distance', 'target_distance', 'is_completed'
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'date' => 'date'
    ];
}
