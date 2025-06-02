import AnimatedCounter from '@/components/animated-counter';
import useGA4Analytics from '@/hooks/use-analytics';
import { useInView } from '@/hooks/use-in-view';
import useOnce from '@/hooks/use-once';
import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { GearIcon, GitHubLogoIcon, HeartFilledIcon, RocketIcon } from '@radix-ui/react-icons';
import { BadgeCheck, Braces, BrainCircuit, MousePointerClickIcon, PackageCheckIcon, PackageOpenIcon, PackageSearchIcon, Rocket } from 'lucide-react';

interface Props {
    totalKits: number;
    totalVisitors: number;
    totalContributors: number;
    totalStars: number;
}

export default function About({ totalKits, totalVisitors, totalStars }: Props) {
    const { sendPageView } = useGA4Analytics();
    const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

    useOnce(function () {
        sendPageView('about', 'Larakits - About');
    });

    const sections = [
        {
            title: 'The Beginning',
            description:
                "With Laravel 12's introduction of starter kits from both Laravel and the community, we identified a gap. While Packagist and GitHub existed, neither was designed specifically for discovering Laravel starter kits.",
            gradient: 'from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800',
            highlight: 'Laravel 12 starter kits',
        },
        {
            title: 'The Challenge',
            description:
                "Existing platforms weren't optimized for framework-specific discovery. Their search parameters were too general, making it difficult for developers to find Laravel starter kits based on specific tech stacks.",
            icon: Braces,
            gradient: 'from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900',
            highlight: 'Framework-specific discovery',
        },
        {
            title: 'Our Solution',
            description:
                'Larakits emerged as a specialized platform for discovering community-maintained Laravel starter kits, offering Laravel-specific filters and seamless integration with the existing ecosystem.',
            gradient: 'from-red-50 to-neutral-50 dark:from-red-950 dark:to-neutral-900',
            highlight: 'Specialized platform',
            windowFrame: true,
        },
    ];

    return (
        <GuestLayout>
            <Head title="About" />

            {/* Hero section */}
            <div className="mx-auto max-w-7xl px-2 sm:px-4">
                <div className="mx-auto max-w-3xl py-12 text-center sm:py-24">
                    <h1 className="text-3xl font-bold sm:text-6xl">The Story Behind Larakits</h1>
                    <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg sm:leading-8">
                        Born from the Laravel community's needs, Larakits bridges the gap between starter kit creators and developers looking for the
                        perfect project foundation.
                    </p>
                </div>
            </div>

            {/* Origin Story */}
            <div className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
                <div className="grid gap-8">
                    {/* First Card - Full Width with Brain Art */}
                    <div className="group from-background to-background/50 relative overflow-hidden rounded-2xl border bg-gradient-to-b p-8">
                        <div className="relative flex flex-col p-12 lg:flex-row lg:items-start lg:gap-16">
                            <div className="relative z-10 flex-1">
                                <h3 className="mb-4 text-2xl font-semibold">{sections[0].title}</h3>
                                <div className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 dark:bg-red-950/50">
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400">{sections[0].highlight}</span>
                                </div>
                                <p className="text-muted-foreground max-w-xl text-base leading-relaxed">{sections[0].description}</p>
                            </div>
                            <div className="relative min-h-[300px] flex-1">
                                {/* Brain Illustration */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative aspect-square w-full max-w-md">
                                        <BrainCircuit className="h-full w-full text-neutral-400 dark:text-neutral-600" strokeWidth={0.5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row - Two Cards */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Challenge Card */}
                        <div className="group relative overflow-hidden rounded-2xl border p-16">
                            <div className="relative z-10">
                                <h3 className="mb-4 text-lg font-semibold">{sections[1].title}</h3>
                                <div className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
                                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{sections[1].highlight}</span>
                                </div>
                                <p className="text-muted-foreground w-[80%] text-sm leading-relaxed">{sections[1].description}</p>
                            </div>
                            <Braces className="absolute right-0 bottom-0 h-24 w-24 text-neutral-200 dark:text-neutral-800" strokeWidth={0.5} />
                        </div>

                        {/* Solution Card with Window Frame */}
                        <div className="group relative overflow-hidden rounded-2xl border p-16">
                            <div className="relative z-10 max-w-[60%]">
                                <h3 className="mb-4 text-lg font-semibold">{sections[2].title}</h3>
                                <div className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 dark:bg-red-950/50">
                                    <span className="text-xs font-medium text-red-600 dark:text-red-400">{sections[2].highlight}</span>
                                </div>
                                <p className="text-muted-foreground w-[100%] text-sm leading-relaxed">{sections[2].description}</p>
                            </div>
                            {/* Minimalist Window Frame */}
                            <div className="absolute right-0 bottom-0 h-28 w-40 rounded-tl-xl border-t border-l bg-neutral-50 md:h-48 md:w-64 dark:bg-neutral-900/50">
                                <div className="absolute top-2 left-3 flex gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-red-400/50"></div>
                                    <div className="h-2 w-2 rounded-full bg-neutral-400/50"></div>
                                    <div className="h-2 w-2 rounded-full bg-neutral-400/50"></div>
                                </div>
                                <div className="absolute inset-6 grid grid-cols-3 gap-2">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Approach */}
            <div className="border-t">
                <div className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-2xl font-bold sm:text-4xl">Our Approach</h2>
                            <div className="mt-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
                                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Respecting Laravel's Ecosystem</span>
                            </div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="group relative overflow-hidden rounded-2xl border p-8">
                                <div className="relative z-10">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                        <PackageCheckIcon className="h-6 w-6 text-neutral-600 dark:text-neutral-400" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="mb-3 text-lg font-semibold">Respecting the Ecosystem</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Instead of creating another submission platform, we chose to automatically curate starter kits from Packagist.
                                        This decision aligns with Laravel's recommendations and prevents maintainers from managing their kits across
                                        multiple platforms.
                                    </p>
                                </div>
                                <div className="absolute right-0 bottom-0 h-32 w-32 bg-[radial-gradient(circle_at_center,theme(colors.neutral.100),transparent)] opacity-40 dark:bg-[radial-gradient(circle_at_center,theme(colors.neutral.800),transparent)]"></div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl border p-8">
                                <div className="relative z-10">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                        <BadgeCheck className="h-6 w-6 text-neutral-600 dark:text-neutral-400" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="mb-3 text-lg font-semibold">Seamless Integration</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        By integrating with Packagist, we complement existing tools like Laravel Herd and the Laravel installer,
                                        making the experience familiar and comfortable for Laravel developers.
                                    </p>
                                </div>
                                <div className="absolute right-0 bottom-0 h-32 w-32 bg-[radial-gradient(circle_at_center,theme(colors.neutral.100),transparent)] opacity-40 dark:bg-[radial-gradient(circle_at_center,theme(colors.neutral.800),transparent)]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-muted/50">
                <div className="container mx-auto p-16">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* Title Container */}
                        <div className="mx-auto mb-16 max-w-fit rounded-4xl p-6">
                            <h2 className="text-2xl font-bold tracking-wider sm:text-4xl">
                                How does Larakits
                                <span className="block">work</span>
                            </h2>
                            <div className="bg-primary/5 mb-2 inline-flex -rotate-2 items-center gap-2 rounded-full px-4 py-2">
                                <BadgeCheck className="text-primary h-5 w-5" />
                                <span className="text-sm font-medium">Built for Laravel developers</span>
                            </div>
                        </div>

                        <div className="relative mt-20">
                            {/* Process Timeline */}
                            <div className="via-primary/20 absolute top-[250px] right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent to-transparent sm:block">
                                <div className="bg-background absolute top-1/2 left-[14.5%] h-5 w-5 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-lg"></div>
                                <div className="bg-background absolute top-1/2 left-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-lg"></div>
                                <div className="bg-background absolute top-1/2 left-[84%] h-5 w-5 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-lg"></div>
                            </div>

                            {/* Process Cards */}
                            <div className="relative grid gap-8 sm:grid-cols-3">
                                <div className="group relative">
                                    <div className="bg-background relative overflow-visible rounded-2xl border border-neutral-800 p-6">
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
                                    <div className="mt-20 text-center md:mt-40">
                                        <p className="text-muted-foreground text-left text-sm">
                                            We automatically identify Laravel starter kits on Packagist using specialized criteria and keywords.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="bg-background relative overflow-visible rounded-2xl border border-neutral-800 p-6">
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
                                    <div className="mt-20 text-center md:mt-40">
                                        <p className="text-muted-foreground text-center text-sm">
                                            Each kit is analyzed for its tech stack and features to enable Laravel-specific filtering.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="bg-background relative overflow-visible rounded-2xl border border-neutral-800 p-6">
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
                                    <div className="mt-20 text-center md:mt-40">
                                        <p className="text-muted-foreground text-center text-sm">
                                            Information is continuously synchronized with Packagist to ensure you get the latest updates.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="border-t">
                <div ref={statsRef} className="mx-auto max-w-7xl px-2 py-12 sm:px-4 sm:py-24">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold sm:text-3xl">Trusted by developers worldwide</h2>
                            <p className="text-muted-foreground mt-4 text-base sm:text-lg">Join our growing community of Laravel developers</p>
                        </div>
                        <dl className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Stat Card 1 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-10">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-muted/10 dark:bg-muted/20 z-10 mb-2 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
                                    <PackageOpenIcon className="text-foreground h-8 w-8 sm:h-10 sm:w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    {statsInView && <AnimatedCounter value={totalKits} className="text-4xl font-extrabold sm:text-5xl" />}
                                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">Starter Kits</p>
                                </div>
                            </div>
                            {/* Stat Card 2 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-10">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-muted/10 dark:bg-muted/20 z-10 mb-2 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
                                    <MousePointerClickIcon className="text-foreground h-8 w-8 sm:h-10 sm:w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    {statsInView && <AnimatedCounter value={totalVisitors} className="text-3xl font-extrabold sm:text-4xl" />}
                                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">Site Visitors</p>
                                </div>
                            </div>
                            {/* Stat Card 3 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-10">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-muted/10 dark:bg-muted/20 z-10 mb-2 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
                                    <GitHubLogoIcon className="text-foreground h-8 w-8 sm:h-10 sm:w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    {statsInView && <AnimatedCounter value={totalStars} className="text-3xl font-extrabold sm:text-4xl" />}
                                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">Github Stars</p>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Foundation Section */}
            <div className="bg-muted/50">
                <div className="mx-auto max-w-7xl px-2 py-12 sm:px-4 sm:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-2xl font-bold sm:text-4xl">Discover Your Next Laravel Project's Foundation</h2>
                        <p className="text-muted-foreground mt-6 text-base leading-relaxed sm:text-lg">
                            Larakits is your go-to platform for discovering community-maintained Laravel starter kits. We help developers find the
                            perfect foundation for their next project, saving time and ensuring best practices from the start.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Larakits Section */}
            <div className="border-t">
                <div className="mx-auto max-w-7xl px-2 py-12 sm:px-4 sm:py-24">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="text-2xl font-bold sm:text-4xl">Why Larakits?</h2>
                        <p className="text-muted-foreground mt-3 text-base sm:text-lg">The foundation to start your project right</p>
                        <div className="text-muted-foreground mt-6 text-base leading-relaxed sm:text-lg">
                            We believe in the power of starting projects with a solid foundation. That's why we've created a platform that lets you
                            easily find and use community-maintained Laravel starter kits.
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {[
                            {
                                title: 'Community-Driven',
                                description:
                                    'Larakits is an open-source platform, built by the community, for the community. We curate Laravel starter kits that help developers kickstart their projects faster.',
                                icon: HeartFilledIcon,
                                gradient: 'from-red-50 to-neutral-50 dark:from-red-950/50 dark:to-neutral-900/50',
                            },
                            {
                                title: 'One-Stop Shop',
                                description:
                                    'Larakits collects all public Laravel starter kits in one place, making it easier to find the perfect starting point for your next project with Laravel specific search filters.',
                                icon: PackageSearchIcon,
                                gradient: 'from-neutral-100 to-neutral-50 dark:from-neutral-900/50 dark:to-neutral-800/50',
                            },
                            {
                                title: 'Always Evolving',
                                description:
                                    'We encourage kit maintainers to keep starter kits up-to-date with the latest Laravel features and security updates.',
                                icon: RocketIcon,
                                gradient: 'from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-900/50',
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="group relative overflow-hidden rounded-2xl border p-8">
                                <div className="relative z-10">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                        <feature.icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                                    </div>
                                    <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                </div>
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* End of file */}
        </GuestLayout>
    );
}
