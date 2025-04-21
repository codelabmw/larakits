<?php

declare(strict_types=1);

namespace App\Services\Packagist\ValueObjects;

final readonly class Package
{
    /**
     * Creates a Package instance.
     */
    public function __construct(
        public ?string $name,
        public ?string $description,
        public ?string $time,
        public ?array $maintainers,
        public ?string $homepage,
        public ?array $keywords,
        public ?array $licenses,
        public ?array $authors,
        public ?array $source,
        public ?array $require,
        public ?array $requireDev,
        public ?string $type,
        public mixed $abandoned,
        public ?int $downloads,
        public ?int $stars,
    ) {
        //
    }

    /**
     * Creates a Package instance from an array.
     */
    public static function fromArray(array $data): self
    {
        $downloads = 0;

        if (isset($data['downloads'])) {
            $downloads = is_numeric($data['downloads']) ? (int) $data['downloads'] : (int) $data['downloads']['total'];
        }

        $currentVersion = [];

        if (isset($data['versions'])) {
            $versions = array_values($data['versions']);
            $currentVersion = $versions[0];
        }

        return new self(
            name: $data['name'] ?? null,
            description: $data['description'] ?? null,
            time: $data['time'] ?? null,
            maintainers: $data['maintainers'] ?? null,
            homepage: $currentVersion['homepage'] ?? null,
            keywords: $currentVersion['keywords'] ?? null,
            licenses: $currentVersion['license'] ?? null,
            authors: $currentVersion['authors'] ?? null,
            source: $currentVersion['source'] ?? null,
            require: $currentVersion['require'] ?? null,
            requireDev: $currentVersion['require-dev'] ?? null,
            type: $data['type'] ?? null,
            abandoned: $data['abandoned'] ?? false,
            downloads: $downloads,
            stars: $data['github_stars'] ?? null,
        );
    }
}
