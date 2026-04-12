import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import HeartSvg from "@/assets/heart.svg?react";
import { useRepositories } from "@/shared/di/repositoryDI";
import { useInfiniteScroll } from "@/shared/hook/useInfiniteScroll";
import { useCatsQuery } from "@/state/useCatsInfiniteQuery";
import { useFavoriteMutation } from "@/state/useFavoriteMutation";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { t } = useTranslation();
  const { catsRepository, favoritesRepository } = useRepositories();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCatsQuery(catsRepository, favoritesRepository, 15);

  const { mutate: toggleFavorite } = useFavoriteMutation(favoritesRepository);

  const observerTarget = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) return <div>{t("loading")}</div>;
  if (isError) return <div>{t("errorLoading")}</div>;

  const cats = data?.pages.flat() ?? [];

  return (
    <>
      <Grid>
        {cats.map((cat) => (
          <Card
            key={cat.id}
            imageUrl={cat.url}
            ActionElement={HeartSvg}
            isActionPressed={cat.isFavorite}
            onActionPressed={() =>
              toggleFavorite({ cat, isFavorite: cat.isFavorite ?? false })
            }
          />
        ))}
      </Grid>

      <div
        ref={observerTarget}
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {isFetchingNextPage && <span>{t("loadingMore")}</span>}
      </div>
    </>
  );
}
