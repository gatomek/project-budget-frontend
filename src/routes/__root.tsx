import { createRootRoute} from '@tanstack/react-router'
import {RootLayout} from "../components/rootLayout/RootLayout.tsx";

export const Route = createRootRoute({
  component: RootLayout,
})
