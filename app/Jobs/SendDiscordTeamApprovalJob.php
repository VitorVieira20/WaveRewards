<?php

namespace App\Jobs;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendDiscordTeamApprovalJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected array $payload;
    protected ?string $webhookUrl;

    public function __construct(array $payload, ?string $webhookUrl = null)
    {
        $this->payload = $payload;
        $this->webhookUrl = $webhookUrl;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $client = new Client();

        $token = config('services.discord.bot.token');
        $channelId = config('services.discord.bot.channel');
        $url = "https://discord.com/api/v10/channels/{$channelId}/messages";

        if (!$token || !$channelId) {
            throw new Exception('Configurações do Bot do Discord em falta no .env');
        }

        try {
            $response = $client->post($url, [
                'headers' => [
                    'Authorization' => "Bot {$token}",
                    'Content-Type' => 'application/json',
                ],
                'json' => $this->payload,
                'verify' => false,
            ]);

            if ($response->getStatusCode() >= 400) {
                throw new Exception('A API do Discord devolveu um erro: ' . $response->getStatusCode());
            }

            Log::info('Notificação de equipa enviada com botões!');
        } catch (Exception $e) {
            Log::error('Erro no Discord Job: ' . $e->getMessage());
            throw $e;
        }
    }
}
