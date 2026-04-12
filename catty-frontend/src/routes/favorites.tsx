import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import HeartSvg from "@/assets/heart.svg?react";
import { useRepositories } from "@/shared/di/repositoryDI";
import { useInfiniteScroll } from "@/shared/hook/useInfiniteScroll";
import { useFavoriteMutation } from "@/state/useFavoriteMutation";
import { useFavoritesInfiniteQuery } from "@/state/useFavoritesInfiniteQuery";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/favorites")({
  component: FavoritesRoute,
});

function FavoritesRoute() {
  const { t } = useTranslation();
  const { favoritesRepository } = useRepositories();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFavoritesInfiniteQuery(favoritesRepository);

  const { mutate: toggleFavorite } = useFavoriteMutation(favoritesRepository);

  const observerTarget = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) return <div>{t("loading")}</div>;
  if (isError) return <div>{t("errorLoading")}</div>;

  const favoriteCats = data?.pages.flat() ?? [];

  if (favoriteCats.length === 0) {
    return <div className="empty-state">{t("noFavoritesYet")}</div>;
  }

  return (
    <>
      <Grid>
        {favoriteCats.map((cat) => (
          <Card
            key={cat.id}
            imageUrl={cat.url}
            ActionElement={HeartSvg}
            isActionPressed={true}
            onActionPressed={() => toggleFavorite({ cat, isFavorite: true })}
          />
        ))}
      </Grid>

      <div ref={observerTarget} className="loader-container">
        {isFetchingNextPage && <span>{t("loadingMore")}</span>}
      </div>
    </>
  );
}
