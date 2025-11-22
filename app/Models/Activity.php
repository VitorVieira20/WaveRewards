<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'images',
        'description',
        'level',
        'category',
        'location',
        'duration',
        'material',
        'benefits',
        'datetime'
    ];

    protected $casts = [
        'images' => 'array',
        'datetime' => 'datetime'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->using(ActivityUser::class)
            ->withPivot([
                'id',
                'distance',
                'practice_time',
                'points',
                'created_at'
            ])
            ->withTimestamps();
    }

}
