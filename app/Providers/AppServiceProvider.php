<?php

namespace App\Providers;

use App\Services\Github\Github;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Date;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Agent::class, fn() => new Agent(
            name: config('app.agent.name'),
            email: config('app.agent.email'),
        ));

        $this->app->bind(Packagist::class, fn() => new Packagist(
            agent: $this->app->make(Agent::class),
        ));

        $this->app->bind(Github::class, fn() => new Github());
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureCommands();
        $this->configureModels();
        $this->configureDates();
    }

    /**
     * Configure the application's commands.
     */
    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(
            $this->app->isProduction()
        );
    }

    /**
     * Configure the dates.
     */
    private function configureDates(): void
    {
        Date::use(CarbonImmutable::class);
    }

    /**
     * Configure the models.
     */
    private function configureModels(): void
    {
        Model::shouldBeStrict(!$this->app->isProduction());
    }
}
