import type { ReactNode } from "react";
import styles from "./Grid.module.scss";

type GridProps = {
  children: ReactNode;
};

export const Grid = ({ children }: GridProps) => {
  return <div className={styles.grid}>{children}</div>;
};
