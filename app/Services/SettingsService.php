<?php

namespace App\Services;

use App\Repositories\SettingsRepository;
use Illuminate\Support\Facades\Auth;

class SettingsService
{

    public function __construct(protected SettingsRepository $settingsRepository)
    {
    }

    public function getSettings()
    {
        return $this->settingsRepository->getByUserId(Auth::id());
    }

    public function toggleSetting(string $field)
    {
        $settings = $this->getSettings();

        $currentValue = $settings->{$field};
        $newValue = !$currentValue;

        $this->settingsRepository->update($settings, [
            $field => $newValue
        ]);

        return $newValue;
    }

    public function updateSetting(string $field, $value)
    {
        $settings = $this->getSettings();

        $this->settingsRepository->update($settings, [
            $field => $value
        ]);

        return $settings->fresh();
    }
}
