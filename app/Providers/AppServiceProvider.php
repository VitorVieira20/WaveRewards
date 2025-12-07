<?php

namespace App\Providers;

use App\Interfaces\LLMServiceInterface;
use App\Services\LLM\GeminiService;
use App\Services\LLM\GroqService;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(LLMServiceInterface::class, function ($app) {
            $driver = env('AI_DRIVER', 'groq');

            if ($driver === 'gemini') {
                return new GeminiService();
            }

            return new GroqService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('strava', \SocialiteProviders\Strava\Provider::class);
        });
    }
}
