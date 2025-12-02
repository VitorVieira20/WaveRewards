<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = ['name', 'color'];


    public function communityPosts(): BelongsToMany
    {
        return $this->belongsToMany(CommunityPost::class, 'community_post_tag');
    }
}
