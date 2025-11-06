<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StravaAccount extends Model
{
    protected $fillable = [
        'user_id',
        'strava_id',
        'strava_nickname',
        'strava_token',
        'strava_refresh_token',
        'strava_expires_in',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
