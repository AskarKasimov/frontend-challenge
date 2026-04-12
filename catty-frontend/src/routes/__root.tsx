import {
  createRootRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/ui/Header/Header";
import { Tab, Tabs } from "@/ui/index.ts";
import { MainLayout } from "@/ui/MainLayout/MainLayout";

import "./index.scss";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { t } = useTranslation();
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
            {t("allCats")}
          </Tab>
          <Tab
            active={currentPath === "/favorites"}
            onClick={() => navigate({ to: "/favorites" })}
          >
            {t("favoriteCats")}
          </Tab>
        </Tabs>
      </Header>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}
