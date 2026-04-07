import { createRootRoute, Outlet } from "@tanstack/react-router";

import "./index.scss";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
