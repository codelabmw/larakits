<?php

namespace App\Providers;

use App\Http\Client;
use App\Services\Github\Github;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use App\Contracts\Http\Client as ClientContract;
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

        $this->app->bind(Github::class, fn() => new Github(
            client: $this->app->make(Client::class),
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
