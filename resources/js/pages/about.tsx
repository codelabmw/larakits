import AnimatedCounter from '@/components/animated-counter';
import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { GitHubLogoIcon, HeartFilledIcon, RocketIcon } from '@radix-ui/react-icons';
import { MousePointerClickIcon, PackageCheckIcon, PackageOpenIcon } from 'lucide-react';

const features = [
    {
        name: 'Community-Driven',
        description:
            'Larakits is an open-source platform, built by the community, for the community. We curate Laravel starter kits that help developers kickstart their projects faster.',
        icon: HeartFilledIcon,
    },
    {
        name: 'One-Stop Shop',
        description:
            'Larakits collects all public Laravel starter kits in one place, making it easier to find the perfect starting point for your next project with Laravel specific search filters.',
        icon: PackageCheckIcon,
    },
    {
        name: 'Always Evolving',
        description: 'We encourage kit maintainers to keep starter kits up-to-date with the latest Laravel features and security updates.',
        icon: RocketIcon,
    },
];

interface Props {
    totalKits: number;
    totalVisitors: number;
    totalContributors: number;
    totalStars: number;
}

export default function About({ totalKits, totalVisitors, totalStars }: Props) {
    return (
        <GuestLayout>
            <Head title="About" />

            {/* Hero section */}
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl py-24 text-center sm:py-32">
                    <h1 className="text-4xl font-bold sm:text-6xl">Discover Your Next Laravel Project's Foundation</h1>
                    <p className="text-muted-foreground mt-6 text-lg leading-8">
                        Larakits is your go-to platform for discovering community-maintained Laravel starter kits. We help developers find the perfect
                        foundation for their next project, saving time and ensuring best practices from the start.
                    </p>
                </div>
            </div>

            {/* Feature section */}
            <div className="mx-auto max-w-7xl py-24 sm:py-32">
                <div className="mx-auto max-w-3xl lg:text-center">
                    <h2 className="text-primary text-base leading-7 font-semibold">Why Larakits?</h2>
                    <p className="mt-2 text-3xl font-bold sm:text-4xl">The foundation to start your project right</p>
                    <p className="text-muted-foreground mt-6 text-lg leading-8">
                        We believe in the power of starting projects with a solid foundation. That's why we've created a platform that lets you easily
                        find and use community-maintained Laravel starter kits.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold">
                                    <feature.icon className="text-primary h-5 w-5 flex-none" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-base leading-7">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Stats */}
            <div className="border-t">
                <div className="mx-auto max-w-7xl py-24 sm:py-32">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold sm:text-4xl">Trusted by developers worldwide</h2>
                            <p className="text-muted-foreground mt-4 text-lg">Join our growing community of Laravel developers</p>
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Modern Stat Card 1 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-10 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-primary/10 dark:bg-primary/20 z-10 mb-2 flex h-16 w-16 items-center justify-center rounded-full">
                                    <PackageOpenIcon className="text-primary h-10 w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    <AnimatedCounter value={totalKits} className="text-5xl font-extrabold" />
                                    <p className="text-muted-foreground mt-1">Starter Kits</p>
                                </div>
                            </div>

                            {/* Modern Stat Card 2 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-10 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-secondary/10 dark:bg-secondary/20 z-10 mb-2 flex h-16 w-16 items-center justify-center rounded-full">
                                    <MousePointerClickIcon className="text-secondary h-10 w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    <AnimatedCounter value={totalVisitors} className="text-4xl font-extrabold" />
                                    <p className="text-muted-foreground mt-1">Daily Visitors</p>
                                </div>
                            </div>

                            {/* Modern Stat Card 3 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-10 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-muted/10 dark:bg-muted/20 z-10 mb-2 flex h-16 w-16 items-center justify-center rounded-full">
                                    <GitHubLogoIcon className="text-foreground h-10 w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    <AnimatedCounter value={totalStars} className="text-4xl font-extrabold" />
                                    <p className="text-muted-foreground mt-1">Github Stars</p>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
