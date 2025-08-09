<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }} - Maintenance Mode</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-white dark:bg-gray-800 rounded-lg border p-8">
            <div class="flex justify-center mb-6 font-bold text-primary">
                Larakits
            </div>

            <h1 class="text-3xl font-bold mb-4">We'll be back soon!</h1>

            <p class="text-lg text-muted-foreground mb-8">
                Hie there, we're currently performing scheduled maintenance. We'll be back online shortly.
            </p>

            <div class="flex items-center justify-center space-x-4">
                <div class="animate-spin rounded-full size-8 border-b-2 border-primary-500"></div>
                {{-- <span class="text-sm text-muted-foreground">Working on it...</span> --}}
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-muted-foreground">
                    If you need immediate assistance, please contact us at
                    <a href="mailto:{{ config('mail.from.address') }}"
                        class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                        {{ config('mail.from.address') }}
                    </a>
                </p>
            </div>
        </div>
    </div>
</body>

</html>