import KitCard from '@/components/kit-card';
import { KitDetailsSheet } from '@/components/kit-details-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useGA4Analytics from '@/hooks/use-analytics';
import useOnce from '@/hooks/use-once';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRightIcon, GearIcon, GitHubLogoIcon, HeartIcon, LightningBoltIcon, RocketIcon } from '@radix-ui/react-icons';
import { BadgeCheck, PackageSearchIcon, Rocket } from 'lucide-react';
import { useState } from 'react';

interface Props {
    trendingKits: Kit[];
    recentKits: Kit[];
}

export default function Welcome({ trendingKits, recentKits }: Props) {
    const { sendPageView } = useGA4Analytics();
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

    useOnce(function () {
        sendPageView('welcome', 'Larakits - Welcome');
    });

    const features = [
        {
            icon: LightningBoltIcon,
            title: 'Quick Setup',
            description: 'Get your Laravel project up and running in minutes with our curated starter kits.',
        },
        {
            icon: RocketIcon,
            title: 'Modern Stack',
            description: 'Access kits built with the latest technologies and best practices.',
        },
        {
            icon: GearIcon,
            title: 'Customizable',
            description: 'Each kit is designed to be easily customized to match your needs.',
        },
        {
            icon: HeartIcon,
            title: 'Community-Driven',
            description: 'Join a thriving community of Laravel developers sharing their work.',
        },
    ];

    return (
        <GuestLayout>
            <Head title="Welcome" />

            {/* Hero Section */}
            <section className="relative flex min-h-[calc(100vh-4rem)] items-center px-2 sm:px-0">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge variant="outline" className="text-muted-foreground mb-4 rounded-full px-5 py-3">
                            <Rocket />
                            <span>Introducing Larakits!</span>
                        </Badge>
                        <h1 className="mb-6 text-3xl font-light tracking-wider sm:text-5xl">
                            one more reason to <span className="block text-5xl font-bold capitalize sm:text-7xl md:text-9xl">ship faster</span>
                        </h1>
                        <p className="text-muted-foreground mb-8 text-base sm:text-xl">
                            Discover community-maintained starter kits that help you build better Laravel applications faster.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                            <Button asChild size="lg" className="group flex w-full items-center gap-2 sm:w-auto">
                                <Link href="/kits">
                                    <span>Browse Kits</span>
                                    <ArrowRightIcon className="transition-transform group-hover:-rotate-[38deg]" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                                <a target="_blank" href="https://github.com/codelabmw/larakits">
                                    <GitHubLogoIcon />
                                    <span>Star on GitHub</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Kits Section */}
            <section className="bg-muted/40 rounded-2xl border-t px-2 py-12 sm:px-0 lg:rounded-none">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-7xl text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-wider sm:text-3xl">Featured starter kits</h2>
                        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base">
                            Explore our carefully curated collection of Laravel starter kits, each designed to help you kickstart your next project
                            with ease.
                        </p>

                        {trendingKits.length > 0 ? (
                            <Tabs defaultValue="trending" className="mx-auto">
                                <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
                                    <TabsList className="mb-4 w-full flex-nowrap overflow-x-auto sm:mb-8 sm:w-auto">
                                        <TabsTrigger value="trending">Trending</TabsTrigger>
                                        <TabsTrigger value="recent">Recently Added</TabsTrigger>
                                    </TabsList>
                                    <Button asChild size="lg" variant="ghost" className="group w-full sm:w-auto">
                                        <Link href="/kits">
                                            <span>View all</span>
                                            <ArrowRightIcon className="transition-transform group-hover:-rotate-[38deg]" />
                                        </Link>
                                    </Button>
                                </div>
                                <TabsContent value="trending">
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {trendingKits.map((kit) => (
                                            <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="recent">
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {recentKits.map((kit) => (
                                            <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
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
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-2 my-12 py-12 sm:px-0">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-wider sm:text-3xl">Why larakits?</h2>
                        <p className="text-muted-foreground mb-8 text-base sm:text-lg">
                            Larakits is a collection of Laravel starter kits that help you build better Laravel applications faster.
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {features.map((feature) => (
                                <div key={feature.title} className="group bg-background relative overflow-hidden rounded-lg border p-6 text-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-blue-950 dark:to-cyan-950" />
                                    <div className="mb-4 flex items-center justify-center">
                                        <feature.icon className="text-primary h-8 w-8" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="px-2 my-12 p-12 sm:px-0">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* Title Container */}
                        <div className="mx-auto mb-16 max-w-fit rounded-4xl p-6">
                            <h2 className="text-2xl font-bold tracking-wider sm:text-4xl">
                                How does Larakits
                                <span className="block">work</span>
                            </h2>
                            <div className="bg-primary/5 mb-2 inline-flex -rotate-2 items-center gap-2 rounded-full px-4 py-2">
                                <BadgeCheck className="text-primary h-5 w-5" />
                                <span className="text-sm font-medium">Laravel's ecosystem approach</span>
                            </div>
                        </div>

                        <div className="relative mt-20">
                            {/* Process Timeline */}
                            <div className="via-primary/20 hidden sm:block  absolute top-[250px] right-0 left-0 h-0.5 bg-gradient-to-r from-transparent to-transparent">
                                <div className="bg-background absolute top-1/2 left-[14.5%] h-5 w-5 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-lg"></div>
                                <div className="bg-background absolute top-1/2 left-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-lg"></div>
                                <div className="bg-background absolute top-1/2 left-[84%] h-5 w-5 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-lg"></div>
                            </div>

                            {/* Process Cards */}
                            <div className="relative grid gap-8 sm:grid-cols-3">
                                <div className="group relative">
                                    <div className="relative overflow-visible rounded-2xl border border-neutral-800 bg-transparent p-6">
                                        <div className="relative z-10">
                                            <div className="mb-4 flex items-center justify-center">
                                                <div className="rounded-xl bg-red-600/90 p-3">
                                                    <PackageSearchIcon className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                            <h3 className="mb-3 text-lg font-semibold">Discovery</h3>
                                        </div>
                                        <div className="bg-background absolute -bottom-[14px] left-1/2 h-7 w-7 -translate-x-1/2 rotate-45 border-r border-b border-neutral-800"></div>
                                    </div>
                                    <div className="mt-20 md:mt-40 text-center">
                                        <p className="text-muted-foreground text-left text-sm">
                                            We automatically identify Laravel starter kits on Packagist using specialized criteria and keywords.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="relative overflow-visible rounded-2xl border border-neutral-800 bg-transparent p-6">
                                        <div className="relative z-10">
                                            <div className="mb-4 flex items-center justify-center">
                                                <div className="rounded-xl bg-red-600/90 p-3">
                                                    <GearIcon className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                            <h3 className="mb-3 text-lg font-semibold">Processing</h3>
                                        </div>
                                        <div className="bg-background absolute -bottom-[14px] left-1/2 h-7 w-7 -translate-x-1/2 rotate-45 border-r border-b border-neutral-800"></div>
                                    </div>
                                    <div className="mt-20 md:mt-40 text-center">
                                        <p className="text-muted-foreground text-center text-sm">
                                            Each kit is analyzed for its tech stack and features to enable Laravel-specific filtering.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="relative overflow-visible rounded-2xl border border-neutral-800 bg-transparent p-6">
                                        <div className="relative z-10">
                                            <div className="mb-4 flex items-center justify-center">
                                                <div className="rounded-xl bg-red-600/90 p-3">
                                                    <Rocket className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                            <h3 className="mb-3 text-lg font-semibold">Sync</h3>
                                        </div>
                                        <div className="bg-background absolute -bottom-[14px] left-1/2 h-7 w-7 -translate-x-1/2 rotate-45 border-r border-b border-neutral-800"></div>
                                    </div>
                                    <div className="mt-20 md:mt-40 text-center">
                                        <p className="text-muted-foreground text-center text-sm">
                                            Information is continuously synchronized with Packagist to ensure you get the latest updates.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                <Button variant="link" asChild className="group">
                                    <Link href="/about">
                                        Read more about the birth of larakist
                                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:-rotate-[38deg]" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="px-2 my-12 py-12 sm:px-0">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-wider sm:text-3xl">Frequently Asked Questions</h2>
                        <div className="grid gap-6 text-left">
                            <div className="group bg-background relative rounded-xl border p-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-blue-950 dark:to-cyan-950" />
                                <h3 className="mb-3 text-lg font-semibold">How does Larakits find starter kits?</h3>
                                <p className="text-muted-foreground text-sm">
                                    We automatically scan Packagist periodically to identify Laravel starter kits using specialized criteria and
                                    keywords, ensuring we stay in sync with the Laravel ecosystem.
                                </p>
                            </div>
                            <div className="group bg-background relative rounded-xl border p-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-blue-950 dark:to-cyan-950" />
                                <h3 className="mb-3 text-lg font-semibold">Do I need to submit my starter kit to Larakits?</h3>
                                <p className="text-muted-foreground text-sm">
                                    No submission needed. Just publish your starter kit on Packagist with appropriate Laravel starter kit keywords,
                                    and we'll automatically discover it.
                                </p>
                            </div>
                            <div className="group bg-background relative rounded-xl border p-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-blue-950 dark:to-cyan-950" />
                                <h3 className="mb-3 text-lg font-semibold">Why use Packagist instead of GitHub for discovering kits?</h3>
                                <p className="text-muted-foreground text-sm">
                                    We follow Laravel's official recommendation of publishing starter kits on Packagist. This approach ensures broader
                                    coverage beyond GitHub, integrates with Laravel's package ecosystem, and maintains compatibility with tools like
                                    Laravel Herd and the Laravel installer. Plus, Packagist's package metadata helps us provide more accurate
                                    filtering and discovery features.
                                </p>
                            </div>
                            <div className="group bg-background relative rounded-xl border p-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-blue-950 dark:to-cyan-950" />
                                <h3 className="mb-3 text-lg font-semibold">What makes Larakits different from Packagist?</h3>
                                <p className="text-muted-foreground text-sm">
                                    While Packagist serves all PHP packages, Larakits is specifically designed for Laravel starter kits with
                                    framework-specific filters and tech stack information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-muted/40 rounded-2xl border-t px-2 py-12 sm:px-0 lg:rounded-none">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-4 text-2xl font-bold tracking-wider sm:text-3xl">Ready to get started?</h2>
                        <p className="text-muted-foreground mb-8">
                            Browse our collection of Laravel starter kits and find the perfect foundation for your next project. Have your own starter
                            kit? Read our{' '}
                            <Button variant="link" className="p-0 text-base font-normal" asChild>
                                <Link href={route('docs')}>docs</Link>
                            </Button>{' '}
                            to learn how we discover and curate kits.
                        </p>
                        <Button asChild size="lg" className="group">
                            <Link href="/kits" className="gap-2">
                                Browse Starter Kits
                                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:-rotate-[38deg]" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Kit Details Sheet */}
            <KitDetailsSheet kit={selectedKit} onOpenChange={() => setSelectedKit(null)} />
        </GuestLayout>
    );
}
