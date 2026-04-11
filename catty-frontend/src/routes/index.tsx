import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import HeartSvg from "@/assets/heart.svg?react";
import { CatsRepositoryImpl } from "@/data/repository/CatsRepositoryImpl";
import { FavoritesLocalStorageRepository } from "@/data/repository/FavoritesLocalStorageRepository";
import { useCatsQuery } from "@/state/useCatsInfiniteQuery";
import { useFavoriteMutation } from "@/state/useFavoriteMutation";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/")({ component: Index });
const catsRepository = new CatsRepositoryImpl();
const favoritesRepository = new FavoritesLocalStorageRepository();

function Index() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCatsQuery(catsRepository, 15);

  const { mutate: toggleFavorite } = useFavoriteMutation(favoritesRepository);

  const observer = useRef<IntersectionObserver | null>(null);

  const observerTarget = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { rootMargin: "100px" },
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Произошла ошибка при загрузке котиков</div>;

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
        {isFetchingNextPage && <span>... загружаем еще котиков ...</span>}
      </div>
    </>
  );
}
