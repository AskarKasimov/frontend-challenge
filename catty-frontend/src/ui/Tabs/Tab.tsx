import type { ReactNode } from "react";
import styles from "./Tabs.module.scss";

type TabProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export const Tab = ({ children, active, onClick }: TabProps) => {
  return (
    <button
      type="button"
      className={`${styles.tab} ${active ? styles.tabActive : ""}`}
      onClick={() => onClick}
    >
      {children}
    </button>
  );
};
