import {
  createHashHistory,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const hashHistory = createHashHistory();

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    history: hashHistory,
    scrollRestoration: true,
    defaultPreload: false,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
