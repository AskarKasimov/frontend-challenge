import type React from "react";
import styles from "./Card.module.scss";

type CardProps = {
  imageUrl: string;
  ActionElement: React.ElementType<{ className?: string }>;
  isActionPressed?: boolean;
  onActionPressed?: () => void;
};

export const Card = ({
  imageUrl,
  ActionElement,
  isActionPressed = false,
  onActionPressed,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="card" className={styles.image} />
      <button
        type="button"
        className={`${styles.actionButton} ${isActionPressed ? styles.actionPressed : ""}`}
        onClick={onActionPressed}
      >
        <ActionElement className={styles.icon} />
      </button>
    </div>
  );
};
