<?php

declare(strict_types=1);

namespace App\Services\Packagist\ValueObjects;

final class Package
{
    /**
     * Creates a Package instance.
     */
    public function __construct(
        public readonly ?string $name,
        public readonly ?string $description,
        public readonly ?string $time,
        public readonly ?array $maintainers,
        public readonly ?string $homepage,
        public readonly ?array $keywords,
        public readonly ?array $licenses,
        public readonly ?array $authors,
        public readonly ?array $source,
        public readonly ?array $require,
        public readonly ?array $requireDev,
        public readonly ?string $type,
        public readonly mixed $abandoned,
        public readonly ?int $downloads,
        public readonly ?int $stars,
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
            if (is_numeric($data['downloads'])) {
                $downloads = (int) $data['downloads'];
            } else {
                $downloads = (int) $data['downloads']['total'];
            }
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
