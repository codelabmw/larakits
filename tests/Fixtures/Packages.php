<?php

namespace Tests\Fixtures;

abstract class Packages
{
    public static array $all = [
        [
            "name" => "laravel/lumen",
            "description" => "The Laravel Lumen Framework.",
            "url" => "https://packagist.org/packages/laravel/lumen",
            "repository" => "https://github.com/laravel/lumen",
            "downloads" => 1096986,
            "favers" => 7698,
            "abandoned" => "laravel/laravel"
        ],
        [
            "name" => "laravel/vue-starter-kit",
            "description" => "The skeleton application for the Laravel framework.",
            "url" => "https://packagist.org/packages/laravel/vue-starter-kit",
            "repository" => "https://github.com/laravel/vue-starter-kit",
            "downloads" => 28879,
            "favers" => 295
        ],
        [
            "name" => "laravel/react-starter-kit",
            "description" => "The skeleton application for the Laravel framework.",
            "url" => "https://packagist.org/packages/laravel/react-starter-kit",
            "repository" => "https://github.com/laravel/react-starter-kit",
            "downloads" => 40399,
            "favers" => 330
        ],
        [
            "name" => "laravel/livewire-starter-kit",
            "description" => "The official Laravel starter kit for Livewire.",
            "url" => "https://packagist.org/packages/laravel/livewire-starter-kit",
            "repository" => "https://github.com/laravel/livewire-starter-kit",
            "downloads" => 42235,
            "favers" => 257
        ],
        [
            "name" => "wintercms/winter",
            "description" => "Free, open-source, self-hosted CMS platform based on the Laravel PHP Framework. Originally known as October CMS.",
            "url" => "https://packagist.org/packages/wintercms/winter",
            "repository" => "https://github.com/wintercms/winter",
            "downloads" => 35684,
            "favers" => 1412
        ],
        [
            "name" => "statamic/statamic",
            "description" => "Statamic",
            "url" => "https://packagist.org/packages/statamic/statamic",
            "repository" => "https://github.com/statamic/statamic",
            "downloads" => 135495,
            "favers" => 776
        ],
        [
            "name" => "devdojo/wave",
            "description" => "Wave SaaS Starter Kit",
            "url" => "https://packagist.org/packages/devdojo/wave",
            "repository" => "https://github.com/thedevdojo/wave",
            "downloads" => 489,
            "favers" => 5929
        ],
    ];

    public static array $detailed = [
        [
            "package" => [
                "name" => "laravel/lumen",
                "description" => "The Laravel Lumen Framework.",
                "time" => "2015-04-14T14:06:47+00:00",
                "maintainers" => [
                    [
                        "name" => "taylorotwell",
                        "avatar_url" => "https://www.gravatar.com/avatar/f30ff8ad2367afd407a1678e7d8d851f?d=identicon"
                    ]
                ],
                "versions" => [
                    "11.x-dev" => [
                        "name" => "laravel/lumen",
                        "description" => "The Laravel Lumen Framework.",
                        "keywords" => [
                            "framework",
                            "laravel",
                            "lumen"
                        ],
                        "homepage" => "",
                        "version" => "11.x-dev",
                        "version_normalized" => "11.9999999.9999999.9999999-dev",
                        "license" => [
                            "MIT"
                        ],
                        "authors" => [],
                        "source" => [
                            "url" => "https://github.com/laravel/lumen.git",
                            "type" => "git",
                            "reference" => "f690e5bd7e4cdc58fe37928175c32542eb4e13c3"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/laravel/lumen/zipball/f690e5bd7e4cdc58fe37928175c32542eb4e13c3",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "f690e5bd7e4cdc58fe37928175c32542eb4e13c3"
                        ],
                        "type" => "project",
                        "support" => [
                            "source" => "https://github.com/laravel/lumen/tree/11.x"
                        ],
                        "funding" => [],
                        "time" => "2023-02-20T16:17:19+00:00",
                        "autoload" => [
                            "psr-4" => [
                                "App\\" => "app/",
                                "Database\\Seeders\\" => "database/seeders/",
                                "Database\\Factories\\" => "database/factories/"
                            ]
                        ],
                        "require" => [
                            "php" => "^8.2",
                            "laravel/lumen-framework" => "^11.0"
                        ],
                        "require-dev" => [
                            "fakerphp/faker" => "^1.9.1",
                            "mockery/mockery" => "^1.4.4",
                            "phpunit/phpunit" => "^10.0"
                        ],
                        "abandoned" => "laravel/laravel"
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/laravel/lumen",
                "github_stars" => 7638,
                "github_watchers" => 331,
                "github_forks" => 1005,
                "github_open_issues" => 0,
                "language" => "PHP",
                "abandoned" => "laravel/laravel",
                "dependents" => 61,
                "suggesters" => 3,
                "downloads" => [
                    "total" => 1097058,
                    "monthly" => 5728,
                    "daily" => 161
                ],
                "favers" => 7698
            ]
        ],
        [
            "package" => [
                "name" => "laravel/vue-starter-kit",
                "description" => "The skeleton application for the Laravel framework.",
                "time" => "2025-02-24T13:53:35+00:00",
                "maintainers" => [
                    [
                        "name" => "taylorotwell",
                        "avatar_url" => "https://www.gravatar.com/avatar/f30ff8ad2367afd407a1678e7d8d851f?d=identicon"
                    ]
                ],
                "versions" => [
                    "dev-main" => [
                        "name" => "laravel/vue-starter-kit",
                        "description" => "The skeleton application for the Laravel framework.",
                        "keywords" => [
                            "framework",
                            "laravel"
                        ],
                        "homepage" => "",
                        "version" => "dev-main",
                        "version_normalized" => "dev-main",
                        "license" => [
                            "MIT"
                        ],
                        "authors" => [],
                        "source" => [
                            "url" => "https://github.com/laravel/vue-starter-kit.git",
                            "type" => "git",
                            "reference" => "5ae6361cf130fe96347e7384053c7eff192f204e"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/laravel/vue-starter-kit/zipball/5ae6361cf130fe96347e7384053c7eff192f204e",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "5ae6361cf130fe96347e7384053c7eff192f204e"
                        ],
                        "type" => "project",
                        "support" => [
                            "source" => "https://github.com/laravel/vue-starter-kit/tree/main"
                        ],
                        "funding" => [],
                        "time" => "2025-03-19T20:02:25+00:00",
                        "autoload" => [
                            "psr-4" => [
                                "App\\" => "app/",
                                "Database\\Seeders\\" => "database/seeders/",
                                "Database\\Factories\\" => "database/factories/"
                            ]
                        ],
                        "extra" => [
                            "laravel" => [
                                "dont-discover" => []
                            ]
                        ],
                        "default-branch" => true,
                        "require" => [
                            "php" => "^8.2",
                            "inertiajs/inertia-laravel" => "^2.0",
                            "laravel/framework" => "^12.0",
                            "laravel/tinker" => "^2.10.1",
                            "tightenco/ziggy" => "^2.4"
                        ],
                        "require-dev" => [
                            "fakerphp/faker" => "^1.23",
                            "laravel/pail" => "^1.2.2",
                            "laravel/pint" => "^1.18",
                            "laravel/sail" => "^1.41",
                            "mockery/mockery" => "^1.6",
                            "nunomaduro/collision" => "^8.6",
                            "phpunit/phpunit" => "^11.5.3"
                        ]
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/laravel/vue-starter-kit",
                "github_stars" => 295,
                "github_watchers" => 15,
                "github_forks" => 93,
                "github_open_issues" => 7,
                "language" => "Vue",
                "dependents" => 0,
                "suggesters" => 0,
                "downloads" => [
                    "total" => 29231,
                    "monthly" => 24323,
                    "daily" => 624
                ],
                "favers" => 295
            ]
        ],
        [
            "package" => [
                "name" => "laravel/react-starter-kit",
                "description" => "The skeleton application for the Laravel framework.",
                "time" => "2025-02-24T13:53:16+00:00",
                "maintainers" => [
                    [
                        "name" => "taylorotwell",
                        "avatar_url" => "https://www.gravatar.com/avatar/f30ff8ad2367afd407a1678e7d8d851f?d=identicon"
                    ]
                ],
                "versions" => [
                    "dev-main" => [
                        "name" => "laravel/react-starter-kit",
                        "description" => "The skeleton application for the Laravel framework.",
                        "keywords" => [
                            "framework",
                            "laravel"
                        ],
                        "homepage" => "",
                        "version" => "dev-main",
                        "version_normalized" => "dev-main",
                        "license" => [
                            "MIT"
                        ],
                        "authors" => [],
                        "source" => [
                            "url" => "https://github.com/laravel/react-starter-kit.git",
                            "type" => "git",
                            "reference" => "e2d93c8f0277a8ef86334d9d877ce2e1dacf6c21"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/laravel/react-starter-kit/zipball/e2d93c8f0277a8ef86334d9d877ce2e1dacf6c21",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "e2d93c8f0277a8ef86334d9d877ce2e1dacf6c21"
                        ],
                        "type" => "project",
                        "support" => [
                            "source" => "https://github.com/laravel/react-starter-kit/tree/main"
                        ],
                        "funding" => [],
                        "time" => "2025-03-19T14:30:03+00:00",
                        "autoload" => [
                            "psr-4" => [
                                "App\\" => "app/",
                                "Database\\Seeders\\" => "database/seeders/",
                                "Database\\Factories\\" => "database/factories/"
                            ]
                        ],
                        "extra" => [
                            "laravel" => [
                                "dont-discover" => []
                            ]
                        ],
                        "default-branch" => true,
                        "require" => [
                            "php" => "^8.2",
                            "inertiajs/inertia-laravel" => "^2.0",
                            "laravel/framework" => "^12.0",
                            "laravel/tinker" => "^2.10.1",
                            "tightenco/ziggy" => "^2.4"
                        ],
                        "require-dev" => [
                            "fakerphp/faker" => "^1.23",
                            "laravel/pail" => "^1.2.2",
                            "laravel/pint" => "^1.18",
                            "laravel/sail" => "^1.41",
                            "mockery/mockery" => "^1.6",
                            "nunomaduro/collision" => "^8.6",
                            "phpunit/phpunit" => "^11.5.3"
                        ]
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/laravel/react-starter-kit",
                "github_stars" => 330,
                "github_watchers" => 17,
                "github_forks" => 127,
                "github_open_issues" => 7,
                "language" => "TypeScript",
                "dependents" => 0,
                "suggesters" => 0,
                "downloads" => [
                    "total" => 40794,
                    "monthly" => 34823,
                    "daily" => 836
                ],
                "favers" => 330
            ]
        ],
        [
            "package" => [
                "name" => "laravel/livewire-starter-kit",
                "description" => "The official Laravel starter kit for Livewire.",
                "time" => "2025-02-24T13:54:29+00:00",
                "maintainers" => [
                    [
                        "name" => "taylorotwell",
                        "avatar_url" => "https://www.gravatar.com/avatar/f30ff8ad2367afd407a1678e7d8d851f?d=identicon"
                    ]
                ],
                "versions" => [
                    "dev-main" => [
                        "name" => "laravel/livewire-starter-kit",
                        "description" => "The official Laravel starter kit for Livewire.",
                        "keywords" => [
                            "framework",
                            "laravel"
                        ],
                        "homepage" => "",
                        "version" => "dev-main",
                        "version_normalized" => "dev-main",
                        "license" => [
                            "MIT"
                        ],
                        "authors" => [],
                        "source" => [
                            "url" => "https://github.com/laravel/livewire-starter-kit.git",
                            "type" => "git",
                            "reference" => "a2627daa6338f8f608e0a0211a4b6bcb77aef040"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/laravel/livewire-starter-kit/zipball/a2627daa6338f8f608e0a0211a4b6bcb77aef040",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "a2627daa6338f8f608e0a0211a4b6bcb77aef040"
                        ],
                        "type" => "project",
                        "support" => [
                            "source" => "https://github.com/laravel/livewire-starter-kit/tree/main"
                        ],
                        "funding" => [],
                        "time" => "2025-03-19T14:31:48+00:00",
                        "autoload" => [
                            "psr-4" => [
                                "App\\" => "app/",
                                "Database\\Seeders\\" => "database/seeders/",
                                "Database\\Factories\\" => "database/factories/"
                            ]
                        ],
                        "extra" => [
                            "laravel" => [
                                "dont-discover" => []
                            ]
                        ],
                        "default-branch" => true,
                        "require" => [
                            "php" => "^8.2",
                            "laravel/framework" => "^12.0",
                            "laravel/tinker" => "^2.10.1",
                            "livewire/flux" => "^2.0",
                            "livewire/volt" => "^1.7.0"
                        ],
                        "require-dev" => [
                            "fakerphp/faker" => "^1.23",
                            "laravel/pail" => "^1.2.2",
                            "laravel/pint" => "^1.18",
                            "laravel/sail" => "^1.41",
                            "mockery/mockery" => "^1.6",
                            "nunomaduro/collision" => "^8.6",
                            "phpunit/phpunit" => "^11.5.3"
                        ]
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/laravel/livewire-starter-kit",
                "github_stars" => 257,
                "github_watchers" => 17,
                "github_forks" => 89,
                "github_open_issues" => 6,
                "language" => "Blade",
                "dependents" => 0,
                "suggesters" => 0,
                "downloads" => [
                    "total" => 42651,
                    "monthly" => 36618,
                    "daily" => 897
                ],
                "favers" => 257
            ]
        ],
        [
            "package" => [
                "name" => "wintercms/winter",
                "description" => "Free, open-source, self-hosted CMS platform based on the Laravel PHP Framework. Originally known as October CMS.",
                "time" => "2021-03-11T16:13:48+00:00",
                "maintainers" => [
                    [
                        "name" => "LukeTowers",
                        "avatar_url" => "https://www.gravatar.com/avatar/af0d52e14fd7ddc5a268389a8cd8d3e2?d=identicon"
                    ]
                ],
                "versions" => [
                    "dev-develop" => [
                        "name" => "wintercms/winter",
                        "description" => "Free, open-source, self-hosted CMS platform based on the Laravel PHP Framework. Originally known as October CMS.",
                        "keywords" => [
                            "cms",
                            "cmf",
                            "laravel",
                            "winter",
                            "wintercms"
                        ],
                        "homepage" => "https://wintercms.com",
                        "version" => "dev-develop",
                        "version_normalized" => "dev-develop",
                        "license" => [
                            "MIT"
                        ],
                        "authors" => [
                            [
                                "name" => "Alexey Bobkov",
                                "email" => "aleksey.bobkov@gmail.com",
                                "role" => "Original Author"
                            ],
                            [
                                "name" => "Samuel Georges",
                                "email" => "daftspunky@gmail.com",
                                "role" => "Original Author"
                            ],
                            [
                                "name" => "Luke Towers",
                                "email" => "wintercms@luketowers.ca",
                                "role" => "Lead Maintainer"
                            ]
                        ],
                        "source" => [
                            "url" => "https://github.com/wintercms/winter.git",
                            "type" => "git",
                            "reference" => "927c7eb9be7fb196f7b1306dc7819864d26f1076"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/wintercms/winter/zipball/927c7eb9be7fb196f7b1306dc7819864d26f1076",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "927c7eb9be7fb196f7b1306dc7819864d26f1076"
                        ],
                        "type" => "project",
                        "support" => [
                            "discord" => "https://discord.gg/D5MFSPH6Ux",
                            "docs" => "https://wintercms.com/docs/",
                            "issues" => "https://github.com/wintercms/winter/issues",
                            "source" => "https://github.com/wintercms/winter"
                        ],
                        "funding" => [
                            [
                                "url" => "https://github.com/wintercms",
                                "type" => "github"
                            ],
                            [
                                "url" => "https://opencollective.com/wintercms",
                                "type" => "open_collective"
                            ]
                        ],
                        "time" => "2025-03-17T05:55:03+00:00",
                        "extra" => [
                            "merge-plugin" => [
                                "include" => [
                                    "plugins/myauthor/*/composer.json"
                                ],
                                "recurse" => true,
                                "replace" => false,
                                "merge-dev" => false,
                                "merge-replace" => false
                            ]
                        ],
                        "default-branch" => true,
                        "require" => [
                            "laravel/framework" => "^9.1",
                            "winter/storm" => "dev-develop as 1.2",
                            "winter/wn-system-module" => "dev-develop",
                            "winter/wn-backend-module" => "dev-develop",
                            "winter/wn-cms-module" => "dev-develop",
                            "wikimedia/composer-merge-plugin" => "~2.1.0",
                            "php" => ">=8.1"
                        ],
                        "require-dev" => [
                            "dms/phpunit-arraysubset-asserts" => "^0.1.0|^0.2.1",
                            "fakerphp/faker" => "^1.9.2",
                            "mockery/mockery" => "^1.4.4",
                            "php-parallel-lint/php-parallel-lint" => "^1.0",
                            "phpunit/phpunit" => "^9.5.8",
                            "squizlabs/php_codesniffer" => "^3.2"
                        ]
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/wintercms/winter",
                "github_stars" => 1408,
                "github_watchers" => 42,
                "github_forks" => 202,
                "github_open_issues" => 79,
                "language" => "PHP",
                "dependents" => 0,
                "suggesters" => 0,
                "downloads" => [
                    "total" => 35684,
                    "monthly" => 635,
                    "daily" => 25
                ],
                "favers" => 1412
            ]
        ],
        [
            "package" => [
                "name" => "statamic/statamic",
                "description" => "Statamic",
                "time" => "2019-11-21T14:48:37+00:00",
                "maintainers" => [
                    [
                        "name" => "statamic",
                        "avatar_url" => "https://www.gravatar.com/avatar/a7f4e05f49d522c6f6d4ac8f25e6e1b4?d=identicon"
                    ]
                ],
                "versions" => [
                    "5.x-dev" => [
                        "name" => "statamic/statamic",
                        "description" => "Statamic",
                        "keywords" => [
                            "cms",
                            "laravel",
                            "flat file",
                            "statamic"
                        ],
                        "homepage" => "",
                        "version" => "5.x-dev",
                        "version_normalized" => "5.9999999.9999999.9999999-dev",
                        "license" => [],
                        "authors" => [],
                        "source" => [
                            "url" => "https://github.com/statamic/statamic.git",
                            "type" => "git",
                            "reference" => "f513acec80303490656c5bb7dfff95bac4a5583c"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/statamic/statamic/zipball/f513acec80303490656c5bb7dfff95bac4a5583c",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "f513acec80303490656c5bb7dfff95bac4a5583c"
                        ],
                        "type" => "project",
                        "support" => [
                            "source" => "https://github.com/statamic/statamic/tree/v5.1.1"
                        ],
                        "funding" => [
                            [
                                "url" => "https://github.com/statamic",
                                "type" => "github"
                            ]
                        ],
                        "time" => "2025-02-25T20:30:02+00:00",
                        "autoload" => [
                            "psr-4" => [
                                "App\\" => "app/",
                                "Database\\Seeders\\" => "database/seeders/",
                                "Database\\Factories\\" => "database/factories/"
                            ]
                        ],
                        "extra" => [
                            "laravel" => [
                                "dont-discover" => []
                            ]
                        ],
                        "default-branch" => true,
                        "require" => [
                            "php" => "^8.2",
                            "statamic/cms" => "^5.0",
                            "laravel/framework" => "^12.0",
                            "laravel/tinker" => "^2.10.1"
                        ],
                        "require-dev" => [
                            "barryvdh/laravel-debugbar" => "^3.8.1",
                            "fakerphp/faker" => "^1.23",
                            "laravel/pint" => "^1.13",
                            "mockery/mockery" => "^1.6",
                            "laravel/pail" => "^1.2.2",
                            "laravel/sail" => "^1.41",
                            "nunomaduro/collision" => "^8.6",
                            "phpunit/phpunit" => "^11.5.3",
                            "spatie/laravel-ignition" => "^2.9.1"
                        ]
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/statamic/statamic",
                "github_stars" => 776,
                "github_watchers" => 22,
                "github_forks" => 82,
                "github_open_issues" => 0,
                "language" => "PHP",
                "dependents" => 0,
                "suggesters" => 0,
                "downloads" => [
                    "total" => 135538,
                    "monthly" => 3500,
                    "daily" => 88
                ],
                "favers" => 776
            ]
        ],
        [
            "package" => [
                "name" => "devdojo/wave",
                "description" => "Wave SaaS Starter Kit",
                "time" => "2025-03-05T19:08:06+00:00",
                "maintainers" => [
                    [
                        "name" => "devdojo",
                        "avatar_url" => "https://www.gravatar.com/avatar/ebff4a8a0af820adef54e19d5bc4cec2?d=identicon"
                    ]
                ],
                "versions" => [
                    "dev-main" => [
                        "name" => "devdojo/wave",
                        "description" => "Wave SaaS Starter Kit",
                        "keywords" => [
                            "framework",
                            "laravel",
                            "saas",
                            "starter kit"
                        ],
                        "homepage" => "",
                        "version" => "dev-main",
                        "version_normalized" => "dev-main",
                        "license" => [
                            "MIT"
                        ],
                        "authors" => [],
                        "source" => [
                            "url" => "https://github.com/thedevdojo/wave.git",
                            "type" => "git",
                            "reference" => "94ef06890a5d24232d2039126ee7fcb8650e1e1e"
                        ],
                        "dist" => [
                            "url" => "https://api.github.com/repos/thedevdojo/wave/zipball/94ef06890a5d24232d2039126ee7fcb8650e1e1e",
                            "type" => "zip",
                            "shasum" => "",
                            "reference" => "94ef06890a5d24232d2039126ee7fcb8650e1e1e"
                        ],
                        "type" => "project",
                        "support" => [
                            "source" => "https://github.com/thedevdojo/wave/tree/main"
                        ],
                        "funding" => [],
                        "time" => "2025-03-21T20:47:09+00:00",
                        "autoload" => [
                            "psr-4" => [
                                "App\\" => "app/",
                                "Wave\\" => "wave/src/",
                                "Database\\Seeders\\" => "database/seeders/",
                                "Database\\Factories\\" => "database/factories/"
                            ]
                        ],
                        "extra" => [
                            "laravel" => [
                                "providers" => [
                                    "Wave\\WaveServiceProvider"
                                ],
                                "dont-discover" => []
                            ]
                        ],
                        "default-branch" => true,
                        "require" => [
                            "php" => "^8.1",
                            "ext-exif" => "*",
                            "ext-gd" => "*",
                            "bezhansalleh/filament-google-analytics" => "^2.0",
                            "codeat3/blade-phosphor-icons" => "^2.0",
                            "devdojo/app" => "0.11.0",
                            "devdojo/auth" => "^1.0",
                            "devdojo/themes" => "0.0.11",
                            "filament/filament" => "^3.2",
                            "gehrisandro/tailwind-merge-laravel" => "^1.2",
                            "guzzlehttp/guzzle" => "^7.2",
                            "intervention/image" => "^2.7",
                            "lab404/laravel-impersonate" => "^1.7.5",
                            "laravel/folio" => "^1.1",
                            "laravel/framework" => "^11.0",
                            "laravel/tinker" => "^2.7",
                            "laravel/ui" => "^4.5",
                            "livewire/livewire" => "^3.0",
                            "ralphjsmit/livewire-urls" => "^1.4",
                            "spatie/laravel-permission" => "^6.4",
                            "stripe/stripe-php" => "^15.3",
                            "tymon/jwt-auth" => "@dev",
                            "laravel/pail" => "^1.2"
                        ],
                        "require-dev" => [
                            "alebatistella/duskapiconf" => "^1.2",
                            "fakerphp/faker" => "^1.9.1",
                            "laravel/dusk" => "^8.0",
                            "mockery/mockery" => "^1.4.4",
                            "nunomaduro/collision" => "6.4.0|^7.0|^8.1",
                            "pestphp/pest" => "^3.4",
                            "pestphp/pest-plugin-laravel" => "^3.0",
                            "phpunit/phpunit" => "^11.0",
                            "spatie/laravel-ignition" => "^2.0"
                        ]
                    ]
                ],
                "type" => "project",
                "repository" => "https://github.com/thedevdojo/wave",
                "github_stars" => 5928,
                "github_watchers" => 100,
                "github_forks" => 816,
                "github_open_issues" => 3,
                "language" => "CSS",
                "dependents" => 0,
                "suggesters" => 0,
                "downloads" => [
                    "total" => 491,
                    "monthly" => 491,
                    "daily" => 5
                ],
                "favers" => 5929
            ]
        ]
    ];

    public static array $starterKitRepos = [
        "https://github.com/laravel/vue-starter-kit.git",
        "https://github.com/laravel/react-starter-kit.git",
        "https://github.com/laravel/livewire-starter-kit.git",
        'https://github.com/thedevdojo/wave.git',
    ];

    public static array $packageJsons = [
        [
            "private" => true,
            "type" => "module",
            "scripts" => [
                "build" => "vite build",
                "build:ssr" => "vite build && vite build --ssr",
                "dev" => "vite",
                "format" => "prettier --write resources/",
                "format:check" => "prettier --check resources/",
                "lint" => "eslint . --fix"
            ],
            "devDependencies" => [
                "@eslint/js" => "^9.19.0",
                "@types/node" => "^22.13.5",
                "@vue/eslint-config-typescript" => "^14.3.0",
                "eslint" => "^9.17.0",
                "eslint-config-prettier" => "^10.0.1",
                "eslint-plugin-vue" => "^9.32.0",
                "prettier" => "^3.4.2",
                "prettier-plugin-organize-imports" => "^4.1.0",
                "prettier-plugin-tailwindcss" => "^0.6.9",
                "typescript-eslint" => "^8.23.0",
                "vue-tsc" => "^2.2.4"
            ],
            "dependencies" => [
                "@inertiajs/vue3" => "^2.0.0-beta.3",
                "@vitejs/plugin-vue" => "^5.2.1",
                "@vueuse/core" => "^12.0.0",
                "autoprefixer" => "^10.4.20",
                "class-variance-authority" => "^0.7.1",
                "clsx" => "^2.1.1",
                "concurrently" => "^9.0.1",
                "laravel-vite-plugin" => "^1.0",
                "lucide" => "^0.468.0",
                "lucide-vue-next" => "^0.468.0",
                "radix-vue" => "^1.9.11",
                "tailwind-merge" => "^2.5.5",
                "tailwindcss" => "^3.4.1",
                "tailwindcss-animate" => "^1.0.7",
                "typescript" => "^5.2.2",
                "vite" => "^6.2.0",
                "vue" => "^3.5.13",
                "ziggy-js" => "^2.4.2"
            ],
            "optionalDependencies" => [
                "@rollup/rollup-linux-x64-gnu" => "4.9.5",
                "@tailwindcss/oxide-linux-x64-gnu" => "^4.0.1",
                "lightningcss-linux-x64-gnu" => "^1.29.1"
            ]
        ],

        [
            "private" => true,
            "type" => "module",
            "scripts" => [
                "build" => "vite build",
                "build:ssr" => "vite build && vite build --ssr",
                "dev" => "vite",
                "format" => "prettier --write resources/",
                "format:check" => "prettier --check resources/",
                "lint" => "eslint . --fix",
                "types" => "tsc --noEmit"
            ],
            "devDependencies" => [
                "@eslint/js" => "^9.19.0",
                "@types/node" => "^22.13.5",
                "eslint" => "^9.17.0",
                "eslint-config-prettier" => "^10.0.1",
                "eslint-plugin-react" => "^7.37.3",
                "eslint-plugin-react-hooks" => "^5.1.0",
                "prettier" => "^3.4.2",
                "prettier-plugin-organize-imports" => "^4.1.0",
                "prettier-plugin-tailwindcss" => "^0.6.11",
                "typescript-eslint" => "^8.23.0"
            ],
            "dependencies" => [
                "@headlessui/react" => "^2.2.0",
                "@inertiajs/react" => "^2.0.0",
                "@radix-ui/react-avatar" => "^1.1.3",
                "@radix-ui/react-checkbox" => "^1.1.4",
                "@radix-ui/react-collapsible" => "^1.1.3",
                "@radix-ui/react-dialog" => "^1.1.6",
                "@radix-ui/react-dropdown-menu" => "^2.1.6",
                "@radix-ui/react-label" => "^2.1.2",
                "@radix-ui/react-navigation-menu" => "^1.2.5",
                "@radix-ui/react-select" => "^2.1.6",
                "@radix-ui/react-separator" => "^1.1.2",
                "@radix-ui/react-slot" => "^1.1.2",
                "@radix-ui/react-toggle" => "^1.1.2",
                "@radix-ui/react-toggle-group" => "^1.1.2",
                "@radix-ui/react-tooltip" => "^1.1.8",
                "@tailwindcss/vite" => "^4.0.6",
                "@types/react" => "^19.0.3",
                "@types/react-dom" => "^19.0.2",
                "@vitejs/plugin-react" => "^4.3.4",
                "class-variance-authority" => "^0.7.1",
                "clsx" => "^2.1.1",
                "concurrently" => "^9.0.1",
                "globals" => "^15.14.0",
                "laravel-vite-plugin" => "^1.0",
                "lucide-react" => "^0.475.0",
                "react" => "^19.0.0",
                "react-dom" => "^19.0.0",
                "tailwind-merge" => "^3.0.1",
                "tailwindcss" => "^4.0.0",
                "tailwindcss-animate" => "^1.0.7",
                "typescript" => "^5.7.2",
                "vite" => "^6.0"
            ],
            "optionalDependencies" => [
                "@rollup/rollup-linux-x64-gnu" => "4.9.5",
                "@tailwindcss/oxide-linux-x64-gnu" => "^4.0.1",
                "lightningcss-linux-x64-gnu" => "^1.29.1"
            ]
        ],
        [
            "private" => true,
            "type" => "module",
            "scripts" => [
                "build" => "vite build",
                "dev" => "vite"
            ],
            "dependencies" => [
                "@tailwindcss/vite" => "^4.0.7",
                "autoprefixer" => "^10.4.20",
                "axios" => "^1.7.4",
                "concurrently" => "^9.0.1",
                "laravel-vite-plugin" => "^1.0",
                "tailwindcss" => "^4.0.7",
                "vite" => "^6.0"
            ],
            "optionalDependencies" => [
                "@rollup/rollup-linux-x64-gnu" => "4.9.5",
                "@tailwindcss/oxide-linux-x64-gnu" => "^4.0.1",
                "lightningcss-linux-x64-gnu" => "^1.29.1"
            ]
        ],
        [
            "private" => true,
            "type" => "module",
            "scripts" => [
                "dev" => "vite",
                "build" => "vite build"
            ],
            "devDependencies" => [
                "@tailwindcss/forms" => "^0.5.7",
                "@tailwindcss/typography" => "^0.5.12",
                "alpinejs" => "^3.4.2",
                "autoprefixer" => "^10.4.19",
                "axios" => "^1.8.2",
                "laravel-vite-plugin" => "^1.0",
                "postcss" => "^8.4.38",
                "postcss-nesting" => "^12.1.1",
                "tailwindcss" => "^3.4.3",
                "vite" => "^6.2"
            ]
        ]
    ];
}