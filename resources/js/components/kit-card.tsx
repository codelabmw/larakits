import type { Kit } from '@/types';
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
            <div className="mb-4 flex items-center justify-start gap-2">
                <div className="flex -space-x-6">
                    {kit.maintainers.slice(0, 3).map((maintainer) => (
                        <img
                            key={maintainer.name}
                            src={maintainer.avatar_url}
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
                <h3 className="font-semibold">{parseKitName(kit.name)}</h3>
            </div>
            <p className="text-muted-foreground mb-4 flex-1 text-left text-sm">
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
