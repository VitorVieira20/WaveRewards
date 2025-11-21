<?php

namespace App\Repositories;

use App\Models\Activity;

class ActivityRepository
{
    public function getAll()
    {
        return Activity::withCount('users')->get();
    }


    public function findById(int $id)
    {
        return Activity::withCount('users')->find($id);
    }


    public function findByCategory(string $category)
    {
        return Activity::withCount('users')->where('category', $category)->get();
    }
}