import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { GitHubLogoIcon, HeartFilledIcon, RocketIcon } from '@radix-ui/react-icons';

const features = [
    {
        name: 'Community-Driven',
        description:
            'Larakits is built by the community, for the community. We curate high-quality Laravel starter kits that help developers kickstart their projects faster.',
        icon: HeartFilledIcon,
    },
    {
        name: 'Quality Focused',
        description:
            'Each starter kit is carefully reviewed to ensure it follows Laravel best practices, has proper documentation, and maintains high code quality standards.',
        icon: GitHubLogoIcon,
    },
    {
        name: 'Always Evolving',
        description:
            'We continuously work with kit maintainers to keep starter kits up-to-date with the latest Laravel features and security updates.',
        icon: RocketIcon,
    },
];

const stats = [
    { name: 'Starter Kits', value: '50+' },
    { name: 'Active Users', value: '2,000+' },
    { name: 'Community Contributors', value: '100+' },
    { name: 'GitHub Stars', value: '1,000+' },
];

export default function About() {
    return (
        <GuestLayout>
            <Head title="About" />

            <div className="bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative">
                {/* Hero section */}
                <div className="relative isolate">
                    <div className="mx-auto max-w-7xl">
                        <div className="py-24 sm:py-32">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl max-w-2xl">
                                Discover Your Next Laravel Project's Foundation
                            </h1>
                            <p className="text-muted-foreground mt-6 text-lg leading-8 max-w-2xl">
                                Larakits is your go-to platform for discovering high-quality Laravel starter kits. We help developers
                                find the perfect foundation for their next project, saving time and ensuring best practices from the start.
                            </p>
                        </div>
                    </div>

                    {/* Background gradient effect */}
                    <div className="absolute left-1/2 top-0 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-2xl" />
                </div>

                {/* Feature section */}
                <div className="mx-auto max-w-7xl py-24 sm:py-32">
                    <div className="mx-auto max-w-3xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">Why Larakits?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to start your Laravel project right
                        </p>
                        <p className="text-muted-foreground mt-6 text-lg leading-8">
                            We believe in the power of starting projects with a solid foundation. That's why we've created a platform
                            that brings together the best Laravel starter kits in one place.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
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
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Trusted by developers worldwide
                                </h2>
                                <p className="text-muted-foreground mt-4 text-lg">
                                    Join our growing community of Laravel developers
                                </p>
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat) => (
                                    <div key={stat.name} className="flex flex-col bg-muted/50 p-8 rounded-lg">
                                        <dt className="text-sm font-semibold leading-6">{stat.name}</dt>
                                        <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
