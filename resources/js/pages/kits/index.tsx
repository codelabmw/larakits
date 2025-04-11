import KitCard from '@/components/kit-card';
import { KitDetailsSheet } from '@/components/kit-details-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit, Paginator, Tag } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, MagnifyingGlassIcon, StackIcon } from '@radix-ui/react-icons';
import debounce from 'lodash/debounce';
import { PackageSearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import TagsSheet from './partials/tags-sheet';

interface Props {
    kits: Paginator<Kit>;
    filters: {
        search: string;
        tags: string[];
    };
}

export default function Index({ kits, filters }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);

    const updateFilters = useCallback(
        (params: { search?: string; tags?: string[]; stacks?: string[] }) => {
            router.get(
                '/kits',
                {
                    search: params.search ?? search,
                    tags: params.tags ?? selectedTags,
                },
                { preserveState: true, preserveScroll: true },
            );
        },
        [search, selectedTags],
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => updateFilters({ search: value }), 300),
        [updateFilters],
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const handleTagsChange = (tags: Tag[]) => {
        setSelectedTags(tags.map((tag) => tag.slug));
        updateFilters({ tags: tags.map((tag) => tag.slug) });
    };

    return (
        <GuestLayout>
            <Head title="Browse Starter Kits" />

            <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl py-8">
                {/* Header */}
                <div className="mb-8 py-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold tracking-wider">Browse starter kits</h1>
                    <p className="text-muted-foreground">Find the perfect Laravel starter kit for your next project</p>
                </div>

                {kits.data.length > 0 ? (
                    <>
                        {/* Search and Filters */}
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <div className="relative w-[30%]">
                                <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    type="search"
                                    placeholder="Search kits..."
                                    className="pl-9"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <TagsSheet onChanged={handleTagsChange} />

                                <Button variant="outline">
                                    <StackIcon className="h-4 w-4" />
                                    <span>Stack</span>
                                </Button>
                            </div>
                        </div>

                        {/* Kits Grid */}
                        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {kits.data.map((kit) => (
                                <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {kits.total / kits.per_page > 1 && (
                            <div className="flex items-center justify-between">
                                <p className="text-muted-foreground text-sm">
                                    Page {kits.current_page} of {kits.last_page}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Link href={`/kits?page=1`} className={`${kits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}>
                                        <Button variant="outline" size="icon">
                                            <DoubleArrowLeftIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/kits?page=${kits.current_page - 1}`}
                                        className={`${kits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <Button variant="outline" size="icon">
                                            <ChevronLeftIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/kits?page=${kits.current_page + 1}`}
                                        className={`${kits.current_page === kits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <Button variant="outline" size="icon">
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/kits?page=${kits.last_page}`}
                                        className={`${kits.current_page === kits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <Button variant="outline" size="icon">
                                            <DoubleArrowRightIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mx-auto flex h-96 max-w-4xl items-center justify-center rounded border">
                        <div className="text-muted-foreground text-center">
                            <div className="flex items-center justify-center">
                                <PackageSearchIcon className="h-8 w-8" />
                            </div>
                            <p className="mt-2">No kits found at the moment! Still curating...</p>
                        </div>
                    </div>
                )}

                {/* Kit Details Sheet */}
                <KitDetailsSheet kit={selectedKit} onOpenChange={() => setSelectedKit(null)} />
            </div>
        </GuestLayout>
    );
}
