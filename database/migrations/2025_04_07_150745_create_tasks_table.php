<?php

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('status');
            $table->string('exception')->nullable();
            $table->timestamp('should_run_at');
            $table->timestamps();
        });

        Task::create([
            'status' => TaskStatus::OPEN->value,
            'should_run_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
