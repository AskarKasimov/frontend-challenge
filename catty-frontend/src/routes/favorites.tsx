import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import HeartSvg from "@/assets/heart.svg?react";
import { useRepositories } from "@/shared/di/repositoryDI";
import { useFavoriteMutation } from "@/state/useFavoriteMutation";
import { useFavoritesInfiniteQuery } from "@/state/useFavoritesInfiniteQuery";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/favorites")({
  component: FavoritesRoute,
});

function FavoritesRoute() {
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

  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Произошла ошибка при загрузке котиков</div>;

  const favoriteCats = data?.pages.flat() ?? [];

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
        {isFetchingNextPage && <span>... загружаем еще котиков ...</span>}
      </div>
    </>
  );
}
