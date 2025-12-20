<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class DiscordInteractionController extends Controller
{
    public function handle(Request $request)
    {
        $data = $request->all();

        if ($data['type'] === 1) {
            return response()->json(['type' => 1]);
        }

        if ($data['type'] === 3) {
            $customId = $data['data']['custom_id'];

            return response()->json([
                "type" => 9,
                "data" => [
                    "title" => "Segurança: WaveRewards",
                    "custom_id" => "admin_modal_" . $customId,
                    "components" => [[
                        "type" => 1,
                        "components" => [[
                            "type" => 4,
                            "custom_id" => "password_input",
                            "label" => "Insere a Password de Administrador",
                            "style" => 1,
                            "min_length" => 4,
                            "required" => true
                        ]]
                    ]]
                ]
            ]);
        }

        if ($data['type'] === 5) {
            $modalId = $data['data']['custom_id'];
            $password = $data['data']['components'][0]['components'][0]['value'];

            if ($password !== config('services.discord.bot.password')) {
                return response()->json([
                    "type" => 4,
                    "data" => ["content" => "❌ Password incorreta! Acesso negado.", "flags" => 64]
                ]);
            }

            preg_match('/approve_team_(\d+)/', $modalId, $matches);
            $teamId = $matches[1];

            $team = Team::find($teamId);
            if ($team) {
                $team->update(['status' => 'approved']);
                return response()->json([
                    "type" => 4,
                    "data" => ["content" => "✅ A equipa **{$team->name}** foi aprovada com sucesso!"]
                ]);
            }
        }
    }
}