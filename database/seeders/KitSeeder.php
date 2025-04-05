<?php

namespace Database\Seeders;

use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kits = Kit::factory()->count(100)->create();

        foreach ($kits as $kit) {
            $kit->tags()->attach(Tag::all()->random(random_int(3, 5)));
            $kit->stacks()->attach(Stack::all()->random(random_int(2, 3)));
        }
    }
}
