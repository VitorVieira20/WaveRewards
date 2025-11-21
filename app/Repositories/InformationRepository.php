<?php

namespace App\Repositories;

use App\Models\Information;

class InformationRepository
{
    public function getAll()
    {
        return Information::all();
    }


    public function findById(int $id)
    {
        return Information::find($id);
    }
}