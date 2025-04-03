import KitCard from '@/components/kit-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRightIcon, GearIcon, GitHubLogoIcon, HeartIcon, LightningBoltIcon, RocketIcon } from '@radix-ui/react-icons';
import { Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    trendingKits: Kit[];
    recentKits: Kit[];
}

export default function Welcome({ trendingKits, recentKits }: Props) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

            {/* Glow Effect */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition duration-300"
                style={{
                    background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
                }}
            />

            {/* Hero Section */}
            <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-2xl text-center">
                        <Badge variant="outline" className="text-muted-foreground mb-4 rounded-full px-5 py-3">
                            <Rocket />
                            <span>v1.0 is almost here!</span>
                        </Badge>
                        <h1 className="mb-6 text-5xl font-normal tracking-tight sm:text-6xl">
                            one more reason <span className="block font-bold">to ship faster then ever</span>
                        </h1>
                        <p className="text-muted-foreground text-md mb-8 sm:text-xl">
                            Discover community-maintained starter kits that help you build better Laravel applications faster.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Button asChild size="lg" className="group flex items-center gap-2">
                                <Link href="/kits">
                                    <span>Browse Kits</span>
                                    <ArrowRightIcon className="transition-transform group-hover:-rotate-[38deg]" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="https://github.com/codelabmw/laracasts">
                                    <GitHubLogoIcon />
                                    <span>Star on GitHub</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Kits Section */}
            <section className="bg-muted/40 border-t py-16">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-7xl text-center">
                        <h2 className="mb-8 text-3xl font-bold tracking-wider">Featured starter kits</h2>
                        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base">
                            Explore our carefully curated collection of Laravel starter kits, each designed to help you kickstart your next project
                            with ease.
                        </p>

                        <Tabs defaultValue="trending" className="mx-auto">
                            <div className="flex justify-between items-center">
                                <TabsList className="mb-8">
                                    <TabsTrigger value="trending">Trending</TabsTrigger>
                                    <TabsTrigger value="recent">Recently Added</TabsTrigger>
                                </TabsList>

                                <Button asChild size="lg" variant='ghost' className="group">
                                    <Link href="/kits">
                                        <span>View all</span>
                                        <ArrowRightIcon className="transition-transform group-hover:-rotate-[38deg]" />
                                    </Link>
                                </Button>
                            </div>
                            <TabsContent value="trending">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {trendingKits.map((kit) => (
                                        <KitCard key={kit.slug} kit={kit} />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="recent">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {recentKits.map((kit) => (
                                        <KitCard key={kit.slug} kit={kit} />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-8 text-3xl font-bold tracking-wider">Why larakits?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Larakits is a collection of Laravel starter kits that help you build better Laravel applications faster.
                        </p>
                        <div className="grid gap-8 sm:grid-cols-2">
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

            {/* CTA Section */}
            <section className="bg-muted/40 border-t py-16">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-wider">Ready to get started?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Browse our collection of Laravel starter kits and find the perfect foundation for your next project.
                        </p>
                        <Button asChild size="lg" className="group">
                            <Link href="/kits" className="gap-2">
                                Browse Starter Kits
                                <ArrowRightIcon className="h-4 w-4 group-hover:-rotate-[38deg] transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
