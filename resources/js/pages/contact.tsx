import { Card } from '@/components/ui/card';
import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { ChatBubbleIcon, EnvelopeClosedIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const contactMethods = [
    {
        name: 'Email',
        description: 'Send us an email for general inquiries',
        href: 'mailto:hello@larakits.dev',
        icon: EnvelopeClosedIcon,
    },
    {
        name: 'GitHub Issues',
        description: 'Report bugs or request features',
        href: 'https://github.com/codelabmw/larakits/issues',
        icon: GitHubLogoIcon,
    },
    {
        name: 'GitHub Discussions',
        description: 'Join the community discussion',
        href: 'https://github.com/codelabmw/larakits/discussions',
        icon: ChatBubbleIcon,
    },
];

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="Contact" />

            <div className="bg-grid-black/[0.02] dark:bg-grid-white/[0.02] min-h-[calc(100vh-4rem)]">
                <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-12 px-4 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-24 lg:px-8">
                    <div className="text-center lg:max-w-md lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h2>
                        <p className="text-muted-foreground mt-6 text-lg leading-8">
                            Have questions or feedback? We're here to help. Choose your preferred way to reach us.
                        </p>
                    </div>

                    <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {contactMethods.map((method) => (
                            <Card key={method.name} className="hover:bg-muted/50 relative overflow-hidden transition-colors">
                                <a href={method.href} target="_blank" rel="noopener noreferrer" className="block p-6">
                                    <method.icon className="text-primary h-6 w-6" />
                                    <h3 className="mt-4 text-base font-semibold">{method.name}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm">{method.description}</p>
                                </a>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
