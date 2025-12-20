<?php

namespace App\Jobs;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendDiscordMessageJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected array $payload;
    protected ?string $webhookUrl;

    public function __construct(array $payload, ?string $webhookUrl = null)
    {
        $this->payload = $payload;
        $this->webhookUrl = $webhookUrl;
    }

    public function handle(): void
    {
        $client = new Client();

        $url = $this->webhookUrl ?? config('services.discord.contact');

        if (!$url) throw new Exception('Discord webhook URL not found');

        try {
            $response = $client->post($url, [
                'json' => $this->payload,
                'verify' => false,
            ]);

            if ($response->getStatusCode() >= 400) {
                throw new Exception('Discord webhook request failed with status ' . $response->getStatusCode());
            }

            Log::info('Notificação enviada para o Discord via Queue!', [
                'status' => 'SENT',
                'sent_at' => now(),
            ]);
        } catch (Exception $e) {
            Log::error('Erro ao enviar mensagem para o Discord.', [
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }
}