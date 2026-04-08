import {
  createRootRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { Header } from "@/components/Header/Header";
import { MainLayout } from "@/components/MainLayout/MainLayout.tsx";
import { Tab, Tabs } from "@/ui/index.ts";

import "./index.scss";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--ui-bg)" }}>
      <Header>
        <Tabs>
          <Tab
            active={currentPath === "/"}
            onClick={() => navigate({ to: "/" })}
          >
            Все котики
          </Tab>
          <Tab
            active={currentPath === "/favorites"}
            onClick={() => navigate({ to: "/favorites" })}
          >
            Любимые котики
          </Tab>
        </Tabs>
      </Header>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}
