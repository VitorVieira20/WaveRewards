<?php

namespace App\Repositories;

use App\Models\Activity;
use Illuminate\Support\Facades\DB;

class ActivityRepository
{
    public function getAll()
    {
        return Activity::withCount('users')->get();
    }


    public function findById(int $id)
    {
        return Activity::withCount([
            'users as unique_users_count' => function ($query) {
                $query->select(DB::raw('count(distinct users.id)'));
            }
        ])->find($id);
    }


    public function findByCategory(string $category)
    {
        return Activity::withCount('users')->where('category', $category)->get();
    }
}