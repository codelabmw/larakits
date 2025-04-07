<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\CarbonInterface;

/**
 * @property int $id
 * @property string $status
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
        'should_run_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'should_run_at' => 'datetime',
    ];

    /**
     * Checks if the task was run successfully.
     */
    public function wasRunSuccessfully(): bool
    {
        return $this->status === 'success';
    }

    /**
     * Updates the task status.
     */
    public function updateStatus(string $status): void
    {
        $this->status = $status;
        $this->save();
    }

    /**
     * Marks the task as failed.
     */
    public function markFailed(): void
    {
        $this->updateStatus('failed');
    }

    /**
     * Marks the task as successful.
     */
    public function markSuccessful(): void
    {
        $this->updateStatus('success');
    }

    /**
     * Gets the current task.
     */
    public static function currentTask(): ?Task
    {
        return self::query()->where('status', 'pending')->latest()->first();
    }
}
