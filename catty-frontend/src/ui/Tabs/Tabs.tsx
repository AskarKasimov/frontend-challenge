import type { ReactNode } from "react";
import styles from "./Tabs.module.scss";

type TabsProps = {
  children: ReactNode;
};

export const Tabs = ({ children }: TabsProps) => {
  return <nav className={styles.tabs}>{children}</nav>;
};
