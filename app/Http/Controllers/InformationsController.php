<?php

namespace App\Http\Controllers;

use App\Services\InformationService;
use Inertia\Inertia;

class InformationsController extends Controller
{
    public function __construct(protected InformationService $informationService)
    {
    }


    public function index()
    {
        $informations = $this->informationService->getInformations();

        return Inertia::render("Authenticated/Informations/Index", [
            'informations' => $informations
        ]);
    }


    public function show(int $id)
    {
        $information = $this->informationService->getInformationById($id);

        return Inertia::render("Authenticated/Informations/Show", [
            'information' => $information
        ]);
    }
}
