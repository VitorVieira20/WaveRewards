<?php

namespace App\Repositories;

use App\Models\Workshop;

class WorkshopRepository
{
    public function getAll()
    {
        return Workshop::withCount('users')->get();
    }


    public function findById(int $id)
    {
        return Workshop::withCount('users')->find($id);
    }
}