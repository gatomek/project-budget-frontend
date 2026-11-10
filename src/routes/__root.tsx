import { createRootRoute} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {Layout} from "../components/layout/Layout.tsx";

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
    return (
        <>
            <Layout/>
            <TanStackRouterDevtools position="bottom-right" />
        </>
    )
}
