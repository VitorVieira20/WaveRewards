<?php

namespace App\Http\Controllers;

use App\Services\WeatherApiService;
use Inertia\Inertia;

class MeteorologyController extends Controller
{
    public function __construct(protected WeatherApiService $weatherApiService)
    {
    }


    public function index()
    {
        $locations = [
            'Funchal, PT',
            'Santana, PT',
            'Madalena do Mar, PT',
            'Santa Cruz, PT',
        ];

        $data = $this->weatherApiService->getWeatherDataWithForecast($locations, 4);

        return Inertia::render('Authenticated/Meteorology', [
            'weatherData' => $data,
        ]);
    }
}
