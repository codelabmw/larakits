import type { Kit } from '@/types';
import { Link } from '@inertiajs/react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { DownloadIcon } from 'lucide-react';
import numeral from 'numeral';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

export default function KitCard({ kit, onClick }: { kit: Kit; onClick?: () => void }) {
    const parseKitName = (name: string) => {
        return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <Card className="hover:bg-muted/50 flex cursor-pointer flex-col p-6 transition-colors" onClick={onClick}>
            <div className="mb-2 text-left">
                <h3 className="text-lg font-semibold">{parseKitName(kit.name)}</h3>
                <div className="text-muted-foreground mt-1 flex flex-wrap gap-2 text-sm">
                    {kit.maintainers.map((maintainer, index) => (
                        <>
                            <Link
                                key={maintainer.name}
                                href={`/kits?author=${encodeURIComponent(maintainer.name)}`}
                                className="text-primary/80 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {maintainer.name}
                            </Link>
                            {index < kit.maintainers.length - 1 && <span>, </span>}
                        </>
                    ))}
                </div>
            </div>
            <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-left text-sm">
                {kit.description ?? 'This starter kit does not have a description.'}
            </p>
            <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                        <GitHubLogoIcon className="mr-1 h-4 w-4" />
                        {numeral(kit.stars).format('0a')}
                    </span>
                    <span className="flex items-center">
                        <DownloadIcon className="mr-1 h-4 w-4" />
                        {numeral(kit.downloads).format('0a')}
                    </span>
                </div>
                <div className="flex gap-1">
                    {kit.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag.slug} variant="secondary" className="p-1.5 px-2 capitalize">
                            {tag.name}
                        </Badge>
                    ))}
                    {kit.tags.length > 2 && <Badge variant="outline">+{kit.tags.length - 2}</Badge>}
                </div>
            </div>
        </Card>
    );
}
