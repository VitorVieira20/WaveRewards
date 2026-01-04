<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\BadgeService;
use Illuminate\Console\Command;

class SyncUserAchievements extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'badges:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verify and award pending achievements for all users based on their statistics';

    protected $badgeService;

    public function __construct(BadgeService $badgeService)
    {
        parent::__construct();
        $this->badgeService = $badgeService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting achievement synchronization...');

        User::chunk(100, function ($users) {
            foreach ($users as $user) {
                $awarded = $this->badgeService->checkAchievements($user);

                if (count($awarded) > 0) {
                    $badgeNames = collect($awarded)->pluck('name')->implode(', ');
                    $this->line("User #{$user->id} ({$user->name}): New achievements earned: {$badgeNames}");
                }
            }
        });

        $this->info('Synchronization completed successfully!');
    }
}
