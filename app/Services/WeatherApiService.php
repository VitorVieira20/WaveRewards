<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherApiService
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.weatherapi.key');
    }


    public function getWeatherDataWithForecast(array $locations, int $daysToForecast): array
    {
        $data = [];

        foreach ($locations as $location) {

            $apiKey = $this->apiKey;

            $weather = cache()->remember("weather_{$location}", 600, function () use ($daysToForecast, $location, $apiKey) {
                return Http::get("https://api.weatherapi.com/v1/forecast.json", [
                    'key' => $apiKey,
                    'q' => $location,
                    'days' => $daysToForecast,
                    'aqi' => 'no',
                ])->json();
            });

            $data[] = [
                'location' => $weather['location']['name'] . ', ' . $weather['location']['region'],
                'date' => $weather['location']['localtime'],
                'temp' => round($weather['current']['temp_c']),
                'humidity' => $weather['current']['humidity'],
                'wind' => $weather['current']['wind_kph'],
                'uv' => $weather['current']['uv'],
                'condition_icon' => asset('/images/weather/partly_cloudy.png'),

                'forecast' => collect($weather['forecast']['forecastday'])->map(function ($day) {
                    return [
                        'date' => $day['date'],
                        'max' => round($day['day']['maxtemp_c']),
                        'min' => round($day['day']['mintemp_c']),
                        'icon' => 'https:' . $day['day']['condition']['icon'],
                        'text' => $day['day']['condition']['text'],
                    ];
                }),
            ];
        }

        return $data;
    }


    public function getHourlyAndWeekForecats(array $locations): array
    {
        $data = [];

        $apiKey = $this->apiKey;

        foreach ($locations as $location) {

            $weather = cache()->remember("weather_{$location}", 600, function () use ($apiKey, $location) {
                return Http::get("https://api.weatherapi.com/v1/forecast.json", [
                    'key' => $apiKey,
                    'q' => $location,
                    'days' => 7,
                    'aqi' => 'no',
                    'alerts' => 'no',
                ])->json();
            });

            // Forecast semanal (dias)
            $forecastWeek = collect($weather['forecast']['forecastday'])->map(function ($day) {
                return [
                    'date' => $day['date'],
                    'max' => round($day['day']['maxtemp_c']),
                    'min' => round($day['day']['mintemp_c']),
                    'icon' => 'https:' . $day['day']['condition']['icon'],
                    'text' => $day['day']['condition']['text'],
                ];
            });

            // Forecast horário do dia atual (apenas hoje, e dia seguinte)
            $todayHours = $weather['forecast']['forecastday'][0]['hour'];
            $tomorrowHours = $weather['forecast']['forecastday'][1]['hour'];
            $allHours = array_merge($todayHours, $tomorrowHours);

            $forecastHourly = collect($allHours)->map(function ($hour) {
                return [
                    'time' => $hour['time'],
                    'temp' => round($hour['temp_c']),
                    'icon' => 'https:' . $hour['condition']['icon'],
                    'text' => $hour['condition']['text'],
                    'rain' => $hour['chance_of_rain'],
                    'wind' => $hour['wind_kph'],
                ];
            });

            $data[] = [
                'location' => $weather['location']['name'] . ', ' . $weather['location']['region'],
                'date' => $weather['location']['localtime'],
                'temp' => round($weather['current']['temp_c']),
                'humidity' => $weather['current']['humidity'],
                'wind' => $weather['current']['wind_kph'],
                'uv' => $weather['current']['uv'],
                'condition_icon' => asset('/images/weather/partly_cloudy.png'),
                'forecast_week' => $forecastWeek,
                'forecast_hourly' => $forecastHourly,
            ];
        }

        return $data;

    }
}