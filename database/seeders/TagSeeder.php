<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = ['Auth', 'API', 'Admin Panel', 'Teams', 'Roles'];

        foreach ($tags as $tag) {
            Tag::create([
                'slug' => Str::slug($tag),
                'name' => $tag,
            ]);
        }
    }
}
