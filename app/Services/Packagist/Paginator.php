<?php

namespace App\Services\Packagist;

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
    public readonly Collection $items;

    /**
     * Creates a Paginator instance.
     * 
     * @param array<int, Item> $items
     */
    public function __construct(
        array $items,
        public readonly int $total,
        public readonly ?string $next = null,
    ) {
        $this->items = Collection::make($items);
    }
}