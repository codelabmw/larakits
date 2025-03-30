<?php

namespace App\Providers;

use App\Services\Packagist\Contracts\Client as ClientContract;
use App\Services\Packagist\Http\Client;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ClientContract::class, fn() => new Client());

        $this->app->bind(Agent::class, fn() => new Agent(
            name: config('app.agent.name'),
            email: config('app.agent.email'),
        ));

        $this->app->bind(Packagist::class, fn() => new Packagist(
            client: $this->app->make(Client::class),
            agent: $this->app->make(Agent::class),
        ));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
