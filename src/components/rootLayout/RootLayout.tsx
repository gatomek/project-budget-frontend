import {Layout} from '../layout/Layout.tsx';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';

export function RootLayout() {
    return (
        <>
            <Layout />
            <TanStackRouterDevtools position="bottom-right" />
        </>
    );
}
