import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GuestLayout } from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';
import { ChatBubbleIcon, CheckCircledIcon, EnvelopeClosedIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const [success, setSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                setSuccess(true);
                setTimeout(() => setSuccess(false), 5000);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact" />

            <div className="container py-8">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg">Have a question or suggestion? We'd love to hear from you.</p>
                </div>

                <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div className="space-y-6 lg:col-span-1">
                        <div>
                            <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
                            <p className="text-muted-foreground text-sm">
                                Fill out the form or reach out to us directly using the information below.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                                        <EnvelopeClosedIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <a href="mailto:hello@larakits.dev" className="text-muted-foreground hover:text-foreground text-sm">
                                            hello@larakits.dev
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                                        <ChatBubbleIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Discord</p>
                                        <a
                                            href="https://discord.gg/larakits"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-foreground text-sm"
                                        >
                                            Join our community
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="p-6 lg:col-span-2">
                        {success && (
                            <Alert className="mb-6">
                                <CheckCircledIcon className="h-4 w-4" />
                                <AlertDescription>Your message has been sent successfully. We'll get back to you soon!</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-destructive' : ''}
                                    />
                                    {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-destructive' : ''}
                                    />
                                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className={errors.subject ? 'border-destructive' : ''}
                                />
                                {errors.subject && <p className="text-destructive text-xs">{errors.subject}</p>}
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    rows={6}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className={errors.message ? 'border-destructive' : ''}
                                />
                                {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? (
                                    <>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
