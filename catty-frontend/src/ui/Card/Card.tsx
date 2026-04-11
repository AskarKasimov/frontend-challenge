import type React from "react";
import { useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.card}>
      {!isLoaded && <div className={styles.loader} />}
      <img
        src={imageUrl}
        alt="card"
        className={`${styles.image} ${isLoaded ? styles.imageLoaded : ""}`}
        onLoad={() => setIsLoaded(true)}
      />
      <button
        type="button"
        className={`${styles.actionButton} ${isActionPressed ? styles.actionPressed : ""}`}
        onClick={() => onActionPressed}
      >
        <ActionElement className={styles.icon} />
      </button>
    </div>
  );
};
