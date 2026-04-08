import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  component: FavoritesRoute,
});

function FavoritesRoute() {
  return <div>...</div>;
}
