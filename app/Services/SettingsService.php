<?php

namespace App\Services;

class SettingsService
{
    private array $settings;

    private array $defaults = [
        'email_notifications' => true,
        'push_notifications' => true,
        'weekly_digest' => false,
        'challenge_alerts' => true,
        'team_notifications' => true,
        'public_profile' => true,
        'share_activities' => false,
        'share_location' => false,
        'distance_unit' => 'km',
        'language' => 'en',
        'temperature_unit' => 'c',
        'timezone' => 'Europe/Lisbon',
    ];

    public function __construct()
    {
        $sessionSettings = session('settings', []);

        $this->settings = array_merge($this->defaults, $sessionSettings);

        session(['settings' => $this->settings]);
    }

    public function getSettings()
    {
        return $this->settings;
    }

    public function toggleSetting(string $field)
    {
        if (!array_key_exists($field, $this->settings)) {
            return;
        }

        $this->settings[$field] = !$this->settings[$field];
        session(['settings' => $this->settings]);
    }

    public function updateSetting(string $field, $value)
    {
        $this->settings[$field] = $value;
        session(['settings' => $this->settings]);
    }
}
