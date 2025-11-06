<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class StravaService
{
    protected $account;

    public function __construct($account)
    {
        $this->account = $account;
    }

    /**
     * Garante que o access token está válido.
     */
    protected function ensureValidToken()
    {
        // Se o token expirou, renova
        if (Carbon::now()->timestamp >= $this->account->strava_expires_in) {
            $response = Http::asForm()->post('https://www.strava.com/oauth/token', [
                'client_id' => env('STRAVA_CLIENT_ID'),
                'client_secret' => env('STRAVA_CLIENT_SECRET'),
                'grant_type' => 'refresh_token',
                'refresh_token' => $this->account->strava_refresh_token,
            ]);

            $data = $response->json();

            // Atualiza os tokens na BD
            $this->account->update([
                'strava_token' => $data['access_token'],
                'strava_refresh_token' => $data['refresh_token'],
                'strava_expires_in' => $data['expires_at'],
            ]);
        }

        return $this->account->strava_token;
    }

    /**
     * Obtém as últimas atividades (corridas, pedaladas, etc.)
     */
    public function getRecentActivities($perPage = 10)
    {
        //$token = $this->ensureValidToken();

        $response = Http::withToken($this->account->strava_token)
            ->get('https://www.strava.com/api/v3/athlete/activities');

        if ($response->failed()) {
            throw new \Exception('Erro ao obter atividades do Strava: ' . $response->body());
        }

        return $response->json();
    }
}
