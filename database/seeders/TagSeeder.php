<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' =>'workshops'],
            ['name' =>'atividades'],
            ['name' =>'sustentabilidade'],
            ['name' =>'equipas'],
            ['name' => 'meteorologia']
        ];

        foreach ($tags as $tag) {
            $created = Tag::firstOrCreate(
                ['name' => $tag['name']],
                [
                    'name' => $tag['name']
                ]
            );

            if ($created->wasRecentlyCreated) {
                $this->command->info("Tag created: Name {$created->name}");
            } else {
                $this->command->warn("Tag already exists: {$created->name}");
            }
        }
    }
}
