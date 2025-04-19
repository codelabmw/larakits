import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useGA4Analytics from '@/hooks/use-analytics';
import useClipboard from '@/hooks/use-clipboard';
import type { Kit } from '@/types';
import { GitHubLogoIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Check, Copy, DownloadIcon, Scale } from 'lucide-react';
import numeral from 'numeral';
import { Packagist } from './icons/packagist';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface Props {
    kit: Kit | null;
    onOpenChange: (open: boolean) => void;
}

function KitDetailsSheet({ kit, onOpenChange }: Props) {
    const { sendEvent } = useGA4Analytics();
    const { copy, recentlyCopied } = useClipboard();

    const parseKitName = (name: string) => {
        return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleHerdRedirect = () => {
        sendEvent('engagement', 'button_click', 'Laravel Herd');
    };

    const handleCopy = (kit: Kit) => {
        copy(`laravel new --using=${kit.vendor}/${kit.name}`);
        sendEvent('engagement', 'button_click', 'Copy Command');
    };

    return (
        <Sheet open={!!kit} onOpenChange={onOpenChange}>
            <SheetContent className="w-[100%] p-4 md:max-w-xl md:p-8">
                {kit && (
                    <ScrollArea className="h-full pr-6">
                        <div className="space-y-8">
                            {/* Header */}
                            <div>
                                <h2 className="mb-2 text-2xl font-bold tracking-tight">{parseKitName(kit.name)}</h2>
                                <p className="text-muted-foreground">{kit.description ?? 'This starter kit does not have a description.'}</p>
                            </div>

                            {/* Installation */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <Button asChild variant="destructive" onClick={handleHerdRedirect}>
                                    <a target="_blank" href={`https://herd.laravel.com/new?starter-kit=${kit.vendor}/${kit.name}`}>
                                        <span>Laravel Herd</span>
                                    </a>
                                </Button>
                                <div className="text-muted-foreground bg-muted relative flex flex-1 items-center justify-between gap-2 rounded pl-3 text-sm">
                                    <p className="line-clamp-1 flex-1">
                                        laravel new --using={kit.vendor}/{kit.name}
                                    </p>
                                    <Button onClick={() => handleCopy(kit)} variant="ghost" size="icon" className="w-10">
                                        {recentlyCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button asChild size="sm" variant="ghost" className="text-sm">
                                        <a target="_blank" href={`https://packagist.org/packages/${kit.vendor}/${kit.name}`}>
                                            <Packagist />
                                            <span>Packagist</span>
                                        </a>
                                    </Button>

                                    {kit.source_type === 'git' && (
                                        <Button asChild size="sm" variant="ghost" className="text-sm">
                                            <a target="_blank" href={kit.source_url}>
                                                <GitHubLogoIcon />
                                                <span>GitHub</span>
                                            </a>
                                        </Button>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    {kit.licenses.length > 0 && (
                                        <div className="flex items-center">
                                            <div className="text-muted-foreground flex items-center text-sm">
                                                <Scale className="mr-1 h-4 w-4" />
                                                {kit.licenses[0]}
                                            </div>
                                            {kit.licenses.length > 1 && (
                                                <span className="text-muted-foreground ml-1 text-xs">+{kit.licenses.length - 1}</span>
                                            )}
                                        </div>
                                    )}
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <StarFilledIcon className="mr-1 h-4 w-4" />
                                        {numeral(kit.stars).format('0a')}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <DownloadIcon className="mr-1 h-4 w-4" />
                                        {numeral(kit.downloads).format('0a')}
                                    </div>
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
                                            {kit.maintainers.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {kit.maintainers.map((maintainer) => (
                                                        <img
                                                            key={maintainer.name}
                                                            src={maintainer.avatar_url}
                                                            alt={maintainer.name}
                                                            className="border-background h-8 w-8 rounded-full border-2"
                                                            title={maintainer.name}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="px-1">
                                                    <span className="text-muted-foreground">No maintainers found.</span>
                                                </div>
                                            )}
                                        </TabsContent>
                                        <TabsContent value="authors">
                                            {kit.authors.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {kit.authors.map((author) => (
                                                        <Badge key={author.name} variant="outline" className="border-none">
                                                            {author.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="px-1">
                                                    <span className="text-muted-foreground text-sm">No authors found.</span>
                                                </div>
                                            )}
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>

                            {/* Tech Stack */}
                            {kit.stacks.length > 0 && (
                                <div className="px-3">
                                    <h3 className="mb-3 text-sm font-medium">Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {kit.stacks.map((stack) => (
                                            <Badge key={stack.slug} variant="outline" className="p-1.5 px-3 capitalize">
                                                {stack.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Separator />

                            {/* Tags */}
                            {kit.tags.length > 0 && (
                                <div>
                                    <div className="flex flex-wrap gap-2">
                                        {kit.tags.map((tag) => (
                                            <Badge key={tag.slug} variant="secondary" className="p-1.5 px-3 capitalize">
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                )}
            </SheetContent>
        </Sheet>
    );
}

export { KitDetailsSheet };
