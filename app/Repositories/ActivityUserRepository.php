<?php

namespace App\Repositories;

use App\Models\ActivityUser;
use Illuminate\Support\Collection;

class ActivityUserRepository
{
    public function create(array $data): ActivityUser
    {
        return ActivityUser::create($data);
    }


    public function getHistoryByUser(int $userId): Collection
    {
        return ActivityUser::where('user_id', $userId)
            ->with(['activity'])
            ->orderBy('created_at', 'desc')
            ->get();
    }
}