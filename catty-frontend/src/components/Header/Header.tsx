import type { ReactNode } from "react";
import styles from "./Header.module.scss";

type HeaderProps = {
  children?: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>{children}</div>
    </header>
  );
};
