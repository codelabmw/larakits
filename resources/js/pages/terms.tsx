import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <GuestLayout>
            <Head title="Terms of Service" />

            <div className="container py-8">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>

                    <div className="prose prose-slate dark:prose-invert">
                        <p className="lead">By using LaraKits, you agree to these terms. Please read them carefully.</p>

                        <h2>1. Terms</h2>
                        <p>
                            By accessing LaraKits, you agree to be bound by these Terms of Service and to comply with all applicable laws and
                            regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>

                        <h2>2. Use License</h2>
                        <p>
                            Permission is granted to temporarily access LaraKits for personal, non-commercial transitory viewing only. This is the
                            grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul>
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose</li>
                            <li>Attempt to decompile or reverse engineer any software contained on LaraKits</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                        </ul>

                        <h2>3. User Contributions</h2>
                        <p>When submitting starter kits to LaraKits, you agree that:</p>
                        <ul>
                            <li>You own or have the rights to share the submitted content</li>
                            <li>Your submission doesn't infringe on any third party's intellectual property rights</li>
                            <li>You grant LaraKits a non-exclusive license to use, modify, and distribute your submission</li>
                            <li>You are responsible for maintaining and supporting your submitted starter kits</li>
                        </ul>

                        <h2>4. Disclaimer</h2>
                        <p>
                            The materials on LaraKits are provided on an 'as is' basis. LaraKits makes no warranties, expressed or implied, and hereby
                            disclaims and negates all other warranties including, without limitation, implied warranties or conditions of
                            merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of
                            rights.
                        </p>

                        <h2>5. Limitations</h2>
                        <p>
                            In no event shall LaraKits or its suppliers be liable for any damages (including, without limitation, damages for loss of
                            data or profit, or due to business interruption) arising out of the use or inability to use LaraKits, even if LaraKits or
                            a LaraKits authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>

                        <h2>6. Accuracy of Materials</h2>
                        <p>
                            The materials appearing on LaraKits could include technical, typographical, or photographic errors. LaraKits does not
                            warrant that any of the materials on its website are accurate, complete, or current.
                        </p>

                        <h2>7. Links</h2>
                        <p>
                            LaraKits has not reviewed all of the sites linked to its website and is not responsible for the contents of any such
                            linked site. The inclusion of any link does not imply endorsement by LaraKits of the site. Use of any such linked website
                            is at the user's own risk.
                        </p>

                        <h2>8. Modifications</h2>
                        <p>
                            LaraKits may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound
                            by the then current version of these terms of service.
                        </p>

                        <h2>9. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of the United States and you
                            irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>

                        <div className="text-muted-foreground mt-8 text-sm">Last updated: April 2, 2025</div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
