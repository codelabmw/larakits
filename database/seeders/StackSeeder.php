<?php

namespace Database\Seeders;

use App\Models\Stack;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stacks = ['Vue', 'React', 'Svelte', 'Livewire', 'Blade', 'Tailwindcss'];

        foreach ($stacks as $stack) {
            Stack::create([
                'slug' => Str::slug($stack),
                'name' => $stack,
            ]);
        }
    }
}
