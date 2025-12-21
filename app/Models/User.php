<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'username',
        'address',
        'avatar',
        'total_points'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function stravaAccount(): HasOne
    {
        return $this->hasOne(StravaAccount::class);
    }


    public function workshops(): BelongsToMany
    {
        return $this->belongsToMany(Workshop::class)->withTimestamps();
    }


    public function activities()
    {
        return $this->belongsToMany(Activity::class)
            ->using(ActivityUser::class)
            ->withPivot([
                'id',
                'distance',
                'practice_time',
                'wasted_calories',
                'points',
                'trash_collected',
                'created_at'
            ])
            ->withTimestamps();
    }


    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class)
            ->withPivot(['role', 'status'])
            ->withTimestamps();
    }


    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }


    public function settings(): HasOne
    {
        return $this->hasOne(Settings::class);
    }


    public function likedActivities()
    {
        return $this->belongsToMany(Activity::class, 'activity_likes')->withTimestamps();
    }


    public function communityPosts(): HasMany
    {
        return $this->hasMany(CommunityPost::class);
    }


    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class)
            ->withPivot('created_at')
            ->withTimestamps();
    }
}
