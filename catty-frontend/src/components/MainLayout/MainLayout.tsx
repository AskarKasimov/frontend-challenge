import type { ReactNode } from "react";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};
