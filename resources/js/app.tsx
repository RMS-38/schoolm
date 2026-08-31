import { createInertiaApp} from '@inertiajs/react';
import type{ResolvedComponent} from '@inertiajs/react';
import type { ReactNode } from 'react';
import Layout from './layouts/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type PageComponent = ResolvedComponent & {
    layout?: ((page: ReactNode) => ReactNode) | undefined;
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob<{ default: PageComponent }>('./pages/**/*.tsx', { eager: true });
        const page = pages[`./pages/${name}.tsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        
        const component = page.default;

        if (component.layout === null) {
            //
        } else {
            component.layout = component.layout || ((children: ReactNode) => <Layout>{children}</Layout>);
        }

        return component;
    },

    progress: {
        color: '#4B5563',
    },
});
