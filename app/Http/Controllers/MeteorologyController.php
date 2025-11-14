<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MeteorologyController extends Controller
{
    public function index()
    {
        $locations = [
            'Funchal, PT',
            'Santana, PT',
            'Madalena do Mar, PT',
            'Santa Cruz, PT',
        ];

        $apiKey = config('services.weatherapi.key');

        $data = [];

        foreach ($locations as $location) {

            $weather = cache()->remember("weather_{$location}", 600, function () use ($apiKey, $location) {
                return Http::get("https://api.weatherapi.com/v1/forecast.json", [
                    'key' => $apiKey,
                    'q'   => $location,
                    'days' => 4,
                    'aqi' => 'no',
                ])->json();
            });

            $data[] = [
                'location' => $weather['location']['name'] . ', ' . $weather['location']['region'],
                'date'     => $weather['location']['localtime'],
                'temp'     => round($weather['current']['temp_c']),
                'humidity' => $weather['current']['humidity'],
                'wind'     => $weather['current']['wind_kph'],
                'uv'       => $weather['current']['uv'],
                'condition_icon' => asset('/images/weather/partly_cloudy.png'),

                'forecast' => collect($weather['forecast']['forecastday'])->map(function ($day) {
                    return [
                        'date'   => $day['date'],
                        'max'    => round($day['day']['maxtemp_c']),
                        'min'    => round($day['day']['mintemp_c']),
                        'icon'   => 'https:' . $day['day']['condition']['icon'],
                        'text'   => $day['day']['condition']['text'],
                    ];
                }),
            ];
        }

        return Inertia::render('Authenticated/Meteorology', [
            'weatherData' => $data,
        ]);
    }
}
