<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Exception;

class StravaService
{
    protected $account;

    public function __construct($account)
    {
        $this->account = $account;
    }

    protected function ensureValidToken()
    {
        if (Carbon::now()->timestamp >= $this->account->expires_at) {
            try {
                $response = Http::asForm()->post('https://www.strava.com/oauth/token', [
                    'client_id' => config('services.strava.client_id'),
                    'client_secret' => config('services.strava.client_secret'),
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $this->account->strava_refresh_token,
                ]);

                if ($response->failed()) {
                    throw new Exception('Falha ao renovar token');
                }

                $data = $response->json();

                $this->account->update([
                    'strava_token' => $data['access_token'],
                    'strava_refresh_token' => $data['refresh_token'],
                    'strava_expires_in' => $data['expires_at'],
                ]);
            } catch (Exception $e) {
                throw new Exception('A conexão com o Strava expirou. Por favor reconecte.');
            }
        }

        return $this->account->strava_token;
    }

    public function getRecentActivities()
    {
        $token = $this->ensureValidToken();
        $allActivities = [];
        $page = 1;
        $perPage = 200;

        do {
            $response = Http::withToken($token)
                ->get('https://www.strava.com/api/v3/athlete/activities', [
                    'per_page' => $perPage,
                    'page' => $page,
                ]);

            if ($response->failed()) {
                throw new Exception('Erro Strava: ' . $response->body());
            }

            $activities = $response->json();
            $allActivities = array_merge($allActivities, $activities);
            $page++;

        } while (count($activities) === $perPage);

        return collect($allActivities)
            ->groupBy('type')
            ->sortKeys()
            ->toArray();
    }
}
