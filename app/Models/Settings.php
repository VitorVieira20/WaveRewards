<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Settings extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email_notifications',
        'push_notifications',
        'weekly_digest',
        'challenge_alerts',
        'team_notifications',
        'public_profile',
        'share_activities',
        'share_location',
        'distance_unit',
        'language',
        'temperature_unit',
        'timezone',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
