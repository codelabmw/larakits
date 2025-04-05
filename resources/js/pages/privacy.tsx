import { GuestLayout } from '@/layouts/guest-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const sections = [
    { id: 'information-collected', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Your Information' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'policy-changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
];

export default function Privacy() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' },
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <GuestLayout>
            <Head title="Privacy Policy" />

            <div className="relative mx-auto max-w-7xl py-8">
                <div className="lg:flex lg:gap-12">
                    {/* Side Navigation */}
                    <div className="hidden lg:block lg:w-64">
                        <div className="sticky top-24 space-y-4">
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className={cn(
                                            'hover:bg-muted block rounded-md px-3 py-2 text-sm transition-colors',
                                            activeSection === section.id ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground',
                                        )}
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-3xl min-w-0 flex-1">
                        <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="lead text-muted-foreground text-xl">
                                At Larakits, we take your privacy seriously. This policy describes how we collect, use, and protect your personal
                                information.
                            </p>

                            <div className="my-12 space-y-12">
                                <section id="information-collected">
                                    <h2 className="!mt-0 font-bold text-lg">Information We Collect</h2>
                                    <p className="mt-2">When you use LaraKits, we may collect the following types of information:</p>
                                    <ul className="mt-2 list-decimal pl-5">
                                        <li>Name and email address when you contact us</li>
                                        <li>GitHub username when you submit a starter kit</li>
                                        <li>Usage data and analytics</li>
                                        <li>Cookies and similar tracking technologies</li>
                                    </ul>
                                </section>

                                <section id="information-use">
                                    <h2 className="!mt-0 font-bold text-lg">How We Use Your Information</h2>
                                    <p className="mt-2">We use the collected information for the following purposes:</p>
                                    <ul className="mt-2 list-decimal pl-5">
                                        <li>To provide and maintain our service</li>
                                        <li>To notify you about changes to our service</li>
                                        <li>To provide customer support</li>
                                        <li>To gather analysis or valuable information to improve our service</li>
                                    </ul>
                                </section>

                                <section id="data-security">
                                    <h2 className="!mt-0 font-bold text-lg">Data Security</h2>
                                    <p className="mt-2">
                                        We implement appropriate security measures to protect your personal information. However, no method of
                                        transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                                    </p>
                                </section>

                                <section id="third-party">
                                    <h2 className="!mt-0 font-bold text-lg">Third-Party Services</h2>
                                    <p className="mt-2">
                                        We may use third-party services that collect, monitor, and analyze data. These services have their own privacy
                                        policies addressing how they use such information.
                                    </p>
                                </section>

                                <section id="your-rights">
                                    <h2 className="!mt-0 font-bold text-lg">Your Rights</h2>
                                    <p className="mt-2">You have the right to:</p>
                                    <ul className="mt-2 list-decimal pl-5">
                                        <li>Access your personal data</li>
                                        <li>Correct inaccurate data</li>
                                        <li>Request deletion of your data</li>
                                        <li>Object to our use of your data</li>
                                        <li>Request data portability</li>
                                    </ul>
                                </section>

                                <section id="policy-changes">
                                    <h2 className="!mt-0 font-bold text-lg">Changes to This Policy</h2>
                                    <p className="mt-2">
                                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                                        Privacy Policy on this page and updating the "effective date" at the top of this policy.
                                    </p>
                                </section>

                                <section id="contact">
                                    <h2 className="!mt-0 font-bold text-lg">Contact Us</h2>
                                    <p className="mt-2">
                                        If you have any questions about this Privacy Policy, please contact us at{' '}
                                        <a href="mailto:privacy@larakits.dev" className="text-primary hover:underline">
                                            privacy@larakits.dev
                                        </a>
                                        .
                                    </p>
                                </section>
                            </div>

                            <div className="text-muted-foreground mt-12 border-t pt-6 text-sm">Last updated: April 2, 2025</div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
