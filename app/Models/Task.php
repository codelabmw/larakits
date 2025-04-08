<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\CarbonInterface;

/**
 * @property int $id
 * @property TaskStatus $status
 * @property ?string $exception
 * @property CarbonInterface $should_run_at
 * @property CarbonInterface $updated_at
 * @property CarbonInterface $created_at
 */
class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'status',
        'exception',
        'should_run_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => TaskStatus::class,
        'should_run_at' => 'datetime',
    ];

    /**
     * Checks if the task was run successfully.
     */
    public function wasRunSuccessfully(): bool
    {
        return $this->status === TaskStatus::SUCCESS;
    }

    /**
     * Updates the task status.
     */
    public function updateStatus(TaskStatus $status): void
    {
        $this->status = $status;
        $this->save();
    }

    /**
     * Marks the task as failed.
     */
    public function markFailed(?string $exception = null): void
    {
        $this->status = TaskStatus::FAILED;
        $this->exception = $exception;
        $this->save();
    }

    /**
     * Marks the task as successful.
     */
    public function markSuccessful(): void
    {
        $this->updateStatus(TaskStatus::SUCCESS);
    }

    /**
     * Gets the current task.
     */
    public static function currentTask(): ?Task
    {
        return self::query()->where('status', TaskStatus::PENDING->value)->latest()->first();
    }

    /**
     * Checks if the task should run.
     */
    public function shouldRun(): bool
    {
        return $this->should_run_at <= now();
    }
}
