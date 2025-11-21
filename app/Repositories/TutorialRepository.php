<?php

namespace App\Repositories;

use App\Models\Tutorial;

class TutorialRepository
{
    public function getAll()
    {
        return Tutorial::all();
    }


    public function findById(int $id)
    {
        return Tutorial::find($id);
    }
}