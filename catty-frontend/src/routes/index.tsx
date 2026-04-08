import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import HeartSvg from "@/assets/heart.svg?react";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/")({ component: Index });

const SAMPLE_IMAGES = [
  "https://cdn2.thecatapi.com/images/984.jpg",
  "https://cdn2.thecatapi.com/images/984.jpg",
  "https://cdn2.thecatapi.com/images/984.jpg",
  "https://cdn2.thecatapi.com/images/984.jpg",
];

function Index() {
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  const toggleLike = (index: number) => {
    setLikedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Grid>
      {SAMPLE_IMAGES.map((url, index) => (
        <Card
          key={url}
          imageUrl={url}
          ActionElement={HeartSvg}
          isActionPressed={likedCards[index]}
          onActionPressed={() => toggleLike(index)}
        />
      ))}
    </Grid>
  );
}
