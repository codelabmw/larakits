import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { DownloadIcon, GitHubLogoIcon, LightningBoltIcon, MixIcon, RocketIcon, UpdateIcon } from '@radix-ui/react-icons';

interface Props {
    trendingKits: Kit[];
    recentKits: Kit[];
}

export default function Welcome({ trendingKits, recentKits }: Props) {
    return (
        <GuestLayout>
            <Head title="Welcome" />

            {/* Hero Section */}
            <section className="bg-background relative overflow-hidden py-20">
                <div className="relative z-10 container mx-auto">
                    <div className="mx-auto max-w-2xl text-center">
                        <Badge variant="secondary" className="mb-4">
                            v1.0.0 is now live 🎉
                        </Badge>
                        <h1 className="from-foreground to-foreground/70 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                            Discover and Install Laravel Starter Kits
                        </h1>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Find the perfect Laravel starter kit for your next project. Curated from the community, for the community.
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <Button asChild size="lg" className="group">
                                <Link href="/kits">
                                    Browse Kits
                                    <RocketIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="https://github.com/larakits/larakits" target="_blank" rel="noopener noreferrer" className="group">
                                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                                    Star on GitHub
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
                    <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
                </div>
            </section>

            {/* Features Section */}
            <section className="border-t py-20">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">Everything you need to get started</h2>
                        <p className="text-muted-foreground">LaraKits helps you find and install Laravel starter kits with ease.</p>
                    </div>

                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <Card className="relative overflow-hidden p-6">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <MixIcon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Curated Collection</h3>
                            <p className="text-muted-foreground text-sm">
                                Discover high-quality Laravel starter kits, hand-picked from the community.
                            </p>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="relative overflow-hidden p-6">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <LightningBoltIcon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Quick Installation</h3>
                            <p className="text-muted-foreground text-sm">Install any kit with a single command using Herd or Composer.</p>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="relative overflow-hidden p-6">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <UpdateIcon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Always Updated</h3>
                            <p className="text-muted-foreground text-sm">Stay up to date with the latest Laravel starter kits and trends.</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Trending Kits Section */}
            {trendingKits.length > 0 && (
                <section className="border-t py-20">
                    <div className="container mx-auto">
                        <div className="mb-12 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Trending Starter Kits</h2>
                                <p className="text-muted-foreground">Popular kits in the Laravel community</p>
                            </div>
                            <Button asChild variant="ghost">
                                <Link href="/kits">View all kits</Link>
                            </Button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {trendingKits.map((kit) => (
                                <Card key={kit.slug} className="flex flex-col p-6">
                                    <h3 className="mb-2 text-lg font-semibold">{kit.name}</h3>
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
                                            {kit.tags.map((tag) => (
                                                <Badge key={tag.slug} variant="secondary">
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Recent Kits Section */}
            {recentKits.length > 0 && (
                <section className="border-t py-20">
                    <div className="container mx-auto">
                        <div className="mb-12 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Recently Added</h2>
                                <p className="text-muted-foreground">The latest additions to our collection</p>
                            </div>
                            <Button asChild variant="ghost">
                                <Link href="/kits">View all kits</Link>
                            </Button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {recentKits.map((kit) => (
                                <Card key={kit.slug} className="flex flex-col p-6">
                                    <h3 className="mb-2 text-lg font-semibold">{kit.name}</h3>
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
                                            {kit.tags.map((tag) => (
                                                <Badge key={tag.slug} variant="secondary">
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="border-t py-20">
                <div className="container mx-auto">
                    <div className="bg-primary relative overflow-hidden rounded-lg px-6 py-20">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h2 className="text-primary-foreground mb-4 text-3xl font-bold tracking-tight">Ready to get started?</h2>
                            <p className="text-primary-foreground/90 mb-8 text-lg">
                                Browse our collection of Laravel starter kits and find the perfect foundation for your next project.
                            </p>
                            <Button asChild size="lg" variant="secondary" className="group font-semibold">
                                <Link href="/kits">
                                    Browse Starter Kits
                                    <RocketIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        {/* Background Pattern */}
                        <div className="bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary-foreground/8),transparent)] absolute inset-0 -z-10" />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
