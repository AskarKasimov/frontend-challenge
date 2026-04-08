import { createFileRoute } from "@tanstack/react-router";
import HeartSvg from "@/assets/heart.svg?react";
import { useFavoritesStore } from "@/state/favoritesStore.ts";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/favorites")({
  component: FavoritesRoute,
});

function FavoritesRoute() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const favoriteCats = Object.values(favorites);

  if (favoriteCats.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "var(--ui-text)",
        }}
      >
        У вас пока нет любимых котиков :(
      </div>
    );
  }

  return (
    <Grid>
      {favoriteCats.map((cat) => (
        <Card
          key={cat.id}
          imageUrl={cat.url}
          ActionElement={HeartSvg}
          isActionPressed={true}
          onActionPressed={() => toggleFavorite(cat)}
        />
      ))}
    </Grid>
  );
}
