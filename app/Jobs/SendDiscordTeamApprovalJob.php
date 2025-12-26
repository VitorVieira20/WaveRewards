<?php

namespace App\Jobs;

use App\Models\Team;
use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendDiscordTeamApprovalJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected User $user;
    protected Team $team;
    protected ?string $webhookUrl;

    public function __construct(User $user, Team $team, ?string $webhookUrl = null)
    {
        $this->user = $user;
        $this->team = $team;
        $this->webhookUrl = $webhookUrl;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $client = new Client();

        $imageUrl = $this->team->image ? asset('storage/' . $this->team->image) : null;

        $payload = [
            "content" => "🚀 **Novo pedido de criação de equipa!**",
            "embeds" => [
                [
                    "title" => "Equipa: " . $this->team->name,
                    "description" => $team->description ?? "Sem descrição.",
                    "color" => 1935292,
                    "fields" => [
                        [
                            "name" => "👤 Criador",
                            "value" => $this->user->name,
                            "inline" => true
                        ],
                        [
                            "name" => "🆔 ID da Equipa",
                            "value" => (string) $this->team->id,
                            "inline" => true
                        ]
                    ],
                    "image" => $imageUrl ? ["url" => $imageUrl] : null,
                    "footer" => [
                        "text" => "WaveRewards Admin • ID: " . $this->team->id
                    ],
                    "timestamp" => now()->toIso8601String()
                ]
            ],
            "components" => [
                [
                    "type" => 1,
                    "components" => [
                        [
                            "type" => 2,
                            "style" => 3,
                            "label" => "Aprovar",
                            "custom_id" => "approve_team_{$this->team->id}"
                        ],
                        [
                            "type" => 2,
                            "style" => 4,
                            "label" => "Rejeitar",
                            "custom_id" => "reject_team_{$this->team->id}"
                        ]
                    ]
                ]
            ]
        ];

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
                'json' => $payload,
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
