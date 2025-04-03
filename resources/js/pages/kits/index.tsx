import KitCard from '@/components/kit-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useClipboard from '@/hooks/use-clipboard';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit, Paginator, Stack, Tag } from '@/types';
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
import { Check, Copy, Filter, Scale } from 'lucide-react';
import { useState } from 'react';

interface Props {
    kits: Paginator<Kit>;
    tags: Tag[];
    stacks: Stack[];
}



export default function Index({ kits: initialKits, tags, stacks }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedStacks, setSelectedStacks] = useState<Stack[]>([]);
    const { copy, recentlyCopied } = useClipboard();

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

            <div className="mx-auto max-w-7xl py-8">
                {/* Header */}
                <div className="mb-8 py-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold tracking-wider">Browse starter kits</h1>
                    <p className="text-muted-foreground">Find the perfect Laravel starter kit for your next project</p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div className="relative w-[30%]">
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
                            <div className="space-y-8 p-8">
                                {/* Tags Filter */}
                                <div>
                                    <h4 className="mb-4 text-sm font-medium">Tags</h4>
                                    <div className="space-y-4">
                                        {tags.map((tag) => (
                                            <div key={tag.slug} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`tag-${tag.slug}`}
                                                    checked={selectedTags.includes(tag)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedTags([...selectedTags, tag]);
                                                        } else {
                                                            setSelectedTags(selectedTags.filter((t) => t !== tag));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`tag-${tag.slug}`}>{tag.name}</Label>
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
                                            <div key={stack.slug} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`stack-${stack.slug}`}
                                                    checked={selectedStacks.includes(stack)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedStacks([...selectedStacks, stack]);
                                                        } else {
                                                            setSelectedStacks(selectedStacks.filter((s) => s !== stack));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`stack-${stack.slug}`}>{stack.name}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Kits Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredKits.map((kit) => (
                        <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
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
                    <SheetContent className="p-8 sm:max-w-xl">
                        {selectedKit && (
                            <ScrollArea className="h-full pr-6">
                                <div className="space-y-8">
                                    {/* Header */}
                                    <div>
                                        <h2 className="mb-2 text-2xl font-bold tracking-tight">{selectedKit.name}</h2>
                                        <p className="text-muted-foreground">{selectedKit.description ?? 'This starter kit does not have a description.'}</p>
                                    </div>

                                    {/* Installation */}
                                    <div className="flex items-center gap-4">
                                        <Button asChild variant="destructive">
                                            <Link href={`https://herd.laravel.com/new?starter-kit=${selectedKit.vendor}/${selectedKit.name}`}>
                                                <span>Laravel Herd</span>
                                            </Link>
                                        </Button>
                                        <div className="text-muted-foreground bg-muted relative flex-1 rounded p-2 text-sm">
                                            <code className="line-clamp-1">
                                                laravel new --using={selectedKit.vendor}/{selectedKit.name}
                                            </code>
                                            <Button
                                                onClick={() => copy(`laravel new --using=${selectedKit.vendor}/${selectedKit.name}`)}
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-1/2 right-2 -translate-y-1/2"
                                            >
                                                {
                                                    recentlyCopied ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )
                                                }
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4">
                                        {selectedKit.licenses.length > 0 && (
                                            <div className="flex items-center">
                                                <div className="text-muted-foreground flex items-center text-sm">
                                                    <Scale className="mr-1 h-4 w-4" />
                                                    {selectedKit.licenses[0]}
                                                </div>
                                                {selectedKit.licenses.length > 1 && (
                                                    <span className="text-muted-foreground ml-1 text-xs">+{selectedKit.licenses.length - 1}</span>
                                                )}
                                            </div>
                                        )}
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <GitHubLogoIcon className="mr-1 h-4 w-4" />
                                            {selectedKit.stars} stars
                                        </div>
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <DownloadIcon className="mr-1 h-4 w-4" />
                                            {selectedKit.downloads} downloads
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Maintainers */}
                                    <div>
                                        <Tabs defaultValue="maintainers">
                                            <TabsList className="bg-transparent">
                                                <TabsTrigger value="maintainers">Maintainers</TabsTrigger>
                                                <TabsTrigger value="authors">Authors</TabsTrigger>
                                            </TabsList>
                                            <div className="mt-4 px-2">
                                                <TabsContent value="maintainers">
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedKit.maintainers.map((maintainer) => (
                                                            <img
                                                                key={maintainer.name}
                                                                src={maintainer.avatar_url}
                                                                alt={maintainer.name}
                                                                className="border-background h-8 w-8 rounded-full border-2"
                                                                title={maintainer.name}
                                                            />
                                                        ))}
                                                    </div>
                                                </TabsContent>
                                                <TabsContent value="authors">
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedKit.authors.map((author) => (
                                                            <Badge key={author.name} variant="outline" className="border-none">
                                                                {author.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </TabsContent>
                                            </div>
                                        </Tabs>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="px-3">
                                        <h3 className="mb-3 text-sm font-medium">Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedKit.stacks.map((stack) => (
                                                <Badge key={stack.slug} variant="outline">
                                                    {stack.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Tags */}
                                    <div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedKit.tags.map((tag) => (
                                                <Badge key={tag.slug} variant="secondary">
                                                    {tag.name}
                                                </Badge>
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
