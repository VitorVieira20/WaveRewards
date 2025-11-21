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

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
