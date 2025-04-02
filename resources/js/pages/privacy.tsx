import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy" />

            <div className="container py-8">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>

                    <div className="prose prose-slate dark:prose-invert">
                        <p className="lead">
                            At LaraKits, we take your privacy seriously. This policy describes how we collect, use, and protect your personal
                            information.
                        </p>

                        <h2>Information We Collect</h2>
                        <p>When you use LaraKits, we may collect the following types of information:</p>
                        <ul>
                            <li>Name and email address when you contact us</li>
                            <li>GitHub username when you submit a starter kit</li>
                            <li>Usage data and analytics</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul>
                            <li>To provide and maintain our service</li>
                            <li>To notify you about changes to our service</li>
                            <li>To provide customer support</li>
                            <li>To gather analysis or valuable information to improve our service</li>
                        </ul>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information. However, no method of transmission over
                            the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>

                        <h2>Third-Party Services</h2>
                        <p>
                            We may use third-party services that collect, monitor, and analyze data. These services have their own privacy policies
                            addressing how they use such information.
                        </p>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to our use of your data</li>
                            <li>Request data portability</li>
                        </ul>

                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on
                            this page and updating the "effective date" at the top of this policy.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@larakits.dev">privacy@larakits.dev</a>.
                        </p>

                        <div className="text-muted-foreground mt-8 text-sm">Last updated: April 2, 2025</div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
