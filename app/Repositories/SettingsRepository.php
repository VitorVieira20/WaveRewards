<?php

namespace App\Repositories;

use App\Models\Settings;

class SettingsRepository
{
    public function getByUserId(int $userId): Settings
    {
        return Settings::firstOrCreate(['user_id' => $userId]);
    }

    public function update(Settings $settings, array $data): bool
    {
        return $settings->update($data);
    }
}