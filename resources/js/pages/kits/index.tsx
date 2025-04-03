import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Paginator } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    DownloadIcon,
    GitHubLogoIcon,
    MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { Filter } from 'lucide-react';
import { useState } from 'react';

interface Kit {
    id: number;
    name: string;
    description: string;
    stars: number;
    downloads: number;
    tags: string[];
    stacks: string[];
    maintainers: Array<{
        name: string;
        avatar: string;
    }>;
}

interface Props {
    kits: Paginator<Kit>;
    tags: string[];
    stacks: string[];
}

export default function Index({ kits: initialKits, tags, stacks }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

    // Filter kits based on search and selected filters
    const filteredKits = initialKits.data.filter((kit) => {
        const matchesSearch = kit.name.toLowerCase().includes(search.toLowerCase()) || kit.description.toLowerCase().includes(search.toLowerCase());

        const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => kit.tags.includes(tag));

        const matchesStacks = selectedStacks.length === 0 || selectedStacks.every((stack) => kit.stacks.includes(stack));

        return matchesSearch && matchesTags && matchesStacks;
    });

    return (
        <GuestLayout>
            <Head title="Browse Starter Kits" />

            <div className="container py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Browse Starter Kits</h1>
                    <p className="text-muted-foreground">Find the perfect Laravel starter kit for your next project</p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="search"
                            placeholder="Search kits..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                                {(selectedTags.length > 0 || selectedStacks.length > 0) && (
                                    <Badge variant="secondary" className="ml-1">
                                        {selectedTags.length + selectedStacks.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="space-y-8">
                                {/* Tags Filter */}
                                <div>
                                    <h4 className="mb-4 text-sm font-medium">Tags</h4>
                                    <div className="space-y-4">
                                        {tags.map((tag) => (
                                            <div key={tag} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`tag-${tag}`}
                                                    checked={selectedTags.includes(tag)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedTags([...selectedTags, tag]);
                                                        } else {
                                                            setSelectedTags(selectedTags.filter((t) => t !== tag));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Stacks Filter */}
                                <div>
                                    <h4 className="mb-4 text-sm font-medium">Tech Stack</h4>
                                    <div className="space-y-4">
                                        {stacks.map((stack) => (
                                            <div key={stack} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`stack-${stack}`}
                                                    checked={selectedStacks.includes(stack)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedStacks([...selectedStacks, stack]);
                                                        } else {
                                                            setSelectedStacks(selectedStacks.filter((s) => s !== stack));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`stack-${stack}`}>{stack}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Results Summary */}
                <div className="text-muted-foreground mb-6 text-sm">
                    Showing {initialKits.from}-{initialKits.to} of {initialKits.total} kits
                </div>

                {/* Kits Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredKits.map((kit) => (
                        <Card
                            key={kit.id}
                            className="hover:bg-muted/50 flex cursor-pointer flex-col p-6 transition-colors"
                            onClick={() => setSelectedKit(kit)}
                        >
                            <div className="mb-4 flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {kit.maintainers.slice(0, 3).map((maintainer) => (
                                        <img
                                            key={maintainer.name}
                                            src={maintainer.avatar}
                                            alt={maintainer.name}
                                            className="border-background h-8 w-8 rounded-full border-2"
                                            title={maintainer.name}
                                        />
                                    ))}
                                    {kit.maintainers.length > 3 && (
                                        <div className="border-background bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium">
                                            +{kit.maintainers.length - 3}
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold">{kit.name}</h3>
                            </div>
                            <p className="text-muted-foreground mb-4 flex-1 text-sm">{kit.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                                    <span className="flex items-center">
                                        <GitHubLogoIcon className="mr-1 h-4 w-4" />
                                        {kit.stars}
                                    </span>
                                    <span className="flex items-center">
                                        <DownloadIcon className="mr-1 h-4 w-4" />
                                        {kit.downloads}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    {kit.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {kit.tags.length > 3 && <Badge variant="outline">+{kit.tags.length - 3}</Badge>}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                        Page {initialKits.current_page} of {initialKits.last_page}
                    </p>
                    <div className="flex items-center gap-2">
                        <Link href={`/kits?page=1`} className={`${initialKits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}>
                            <Button variant="outline" size="icon">
                                <DoubleArrowLeftIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link
                            href={`/kits?page=${initialKits.current_page - 1}`}
                            className={`${initialKits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <Button variant="outline" size="icon">
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link
                            href={`/kits?page=${initialKits.current_page + 1}`}
                            className={`${initialKits.current_page === initialKits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <Button variant="outline" size="icon">
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link
                            href={`/kits?page=${initialKits.last_page}`}
                            className={`${initialKits.current_page === initialKits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <Button variant="outline" size="icon">
                                <DoubleArrowRightIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Kit Details Sheet */}
                <Sheet open={!!selectedKit} onOpenChange={() => setSelectedKit(null)}>
                    <SheetContent className="sm:max-w-xl">
                        {selectedKit && (
                            <ScrollArea className="h-full pr-6">
                                <div className="space-y-8">
                                    {/* Header */}
                                    <div>
                                        <h2 className="mb-2 text-2xl font-bold tracking-tight">{selectedKit.name}</h2>
                                        <p className="text-muted-foreground">{selectedKit.description}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <GitHubLogoIcon className="mr-1 h-4 w-4" />
                                            {selectedKit.stars} stars
                                        </div>
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <DownloadIcon className="mr-1 h-4 w-4" />
                                            {selectedKit.downloads} downloads
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="mb-3 text-sm font-medium">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedKit.stacks.map((stack) => (
                                                <Badge key={stack} variant="outline">
                                                    {stack}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Maintainers */}
                                    <div>
                                        <h3 className="mb-3 text-sm font-medium">Maintainers</h3>
                                        <div className="flex -space-x-2">
                                            {selectedKit.maintainers.map((maintainer) => (
                                                <img
                                                    key={maintainer.name}
                                                    src={maintainer.avatar}
                                                    alt={maintainer.name}
                                                    className="border-background h-8 w-8 rounded-full border-2"
                                                    title={maintainer.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </GuestLayout>
    );
}
