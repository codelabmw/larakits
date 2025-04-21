<?php

declare(strict_types=1);

namespace App\Services\Packagist;

use App\Services\Packagist\ValueObjects\Package;
use Closure;
use Illuminate\Support\Collection;

/**
 * @template Item
 *
 * @property-read Collection<int, Item> $name
 */
final class Paginator
{
    /**
     * @var Collection<int, Item>
     */
    private Collection $items;

    /**
     * Creates a Paginator instance.
     *
     * @param  array<int, Item>  $items
     */
    public function __construct(
        array $items,
        private readonly ?Closure $getNextPage,
        private ?string $next = null,
        private readonly ?int $perPage = null,
    ) {
        $this->items = Collection::make($items);
    }

    /**
     * Gets the number of items per page.
     */
    public function perPage(): ?int
    {
        return $this->perPage;
    }

    /**
     * Gets the items.
     *
     * @return Collection<int, Item>
     */
    public function items(): Collection
    {
        return $this->items;
    }

    /**
     * Gets the next page items.
     */
    public function next(): bool
    {
        if ($this->next && $this->getNextPage instanceof Closure) {
            $data = ($this->getNextPage)($this->next);

            $items = array_map(fn ($item): Package => Package::fromArray($item), $data['results'] ?? []);

            // @phpstan-ignore-next-line
            $this->items = Collection::make($items);

            $this->next = $data['next'] ?? null;

            return true;
        }

        return false;
    }
}
