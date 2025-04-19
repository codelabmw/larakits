import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import useGA4Analytics from './hooks/use-analytics';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: function (title) {
        if (!title) {
            return appName;
        }

        return `${appName} - ${title}`;
    },
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        // @ts-expect-error Argument of type 'unknown' is not assignable to parameter of type 'string'
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGA4Analytics().initialize(import.meta.env.VITE_GA_MEASUREMENT_ID, props.initialPage.props.sessionId);

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
