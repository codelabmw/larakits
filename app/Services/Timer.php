<?php

namespace App\Services;

class Timer
{
    /**
     * The start time of the timer.
     */
    private float $startTime;

    /**
     * The end time of the timer.
     */
    private float $endTime;

    /**
     * Start the timer.
     */
    public function start(): void
    {
        $this->startTime = microtime(true);
    }

    /**
     * Stop the timer.
     */
    public function stop(): void
    {
        $this->endTime = microtime(true);
    }

    /**
     * Get the duration of the timer from start to end.
     */
    public function duration(): float
    {
        return $this->endTime - $this->startTime;
    }
}