<?php

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
     * @param array<int, Item> $items
     */
    public function __construct(
        array $items,
        private int $total,
        private ?string $next = null,
        private ?Closure $getNextPage,
    ) {
        $this->items = Collection::make($items);
    }

    /**
     * Gets the total number of items.
     */
    public function total(): int
    {
        return $this->total;
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
        if ($this->next && $this->getNextPage !== null) {
            $data = ($this->getNextPage)($this->next);

            $items = array_map(fn($item) => Package::fromArray($item), $data['results']);

            $this->items = Collection::make($items);

            $this->next = $data['next'];

            return true;
        }

        return false;
    }
}