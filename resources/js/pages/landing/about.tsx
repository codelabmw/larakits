import AnimatedCounter from '@/components/animated-counter';
import useGA4Analytics from '@/hooks/use-analytics';
import { useInView } from '@/hooks/use-in-view';
import useOnce from '@/hooks/use-once';
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
    const { sendPageView } = useGA4Analytics();
    const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

    useOnce(function () {
        sendPageView('about', 'Larakits - About');
    });

    return (
        <GuestLayout>
            <Head title="About" />

            {/* Hero section */}
            <div className="mx-auto max-w-7xl px-2 sm:px-4">
                <div className="mx-auto max-w-3xl py-12 text-left sm:py-24 sm:text-center">
                    <h1 className="text-3xl font-bold sm:text-6xl">Discover Your Next Laravel Project's Foundation</h1>
                    <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg sm:leading-8">
                        Larakits is your go-to platform for discovering community-maintained Laravel starter kits. We help developers find the perfect
                        foundation for their next project, saving time and ensuring best practices from the start.
                    </p>
                </div>
            </div>

            {/* Feature section */}
            <div className="mx-auto max-w-7xl px-2 py-12 sm:px-4 sm:py-24">
                <div className="mx-auto max-w-3xl lg:text-center">
                    <h2 className="text-primary text-base leading-7 font-semibold">Why Larakits?</h2>
                    <p className="mt-2 text-2xl font-bold sm:text-4xl">The foundation to start your project right</p>
                    <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg sm:leading-8">
                        We believe in the power of starting projects with a solid foundation. That's why we've created a platform that lets you easily
                        find and use community-maintained Laravel starter kits.
                    </p>
                </div>
                <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-24 lg:max-w-none">
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col px-4 py-6 sm:px-0 sm:py-0">
                                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold">
                                    <feature.icon className="text-primary h-5 w-5 flex-none" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-sm leading-6 sm:text-base sm:leading-7">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
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
                                <div className="bg-primary/10 dark:bg-primary/20 z-10 mb-2 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
                                    <PackageOpenIcon className="text-primary h-8 w-8 sm:h-10 sm:w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    {statsInView && <AnimatedCounter value={totalKits} className="text-4xl font-extrabold sm:text-5xl" />}
                                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">Starter Kits</p>
                                </div>
                            </div>
                            {/* Stat Card 2 */}
                            <div className="group dark:bg-muted/60 hover:border-gradient-to-r hover:from-primary/60 hover:to-secondary/60 relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-10">
                                <span className="from-primary/10 to-secondary/10 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <div className="bg-secondary/10 dark:bg-secondary/20 z-10 mb-2 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
                                    <MousePointerClickIcon className="text-secondary h-8 w-8 sm:h-10 sm:w-10" />
                                </div>
                                <div className="z-10 text-center">
                                    {statsInView && <AnimatedCounter value={totalVisitors} className="text-3xl font-extrabold sm:text-4xl" />}
                                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">Daily Visitors</p>
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
        </GuestLayout>
    );
}
