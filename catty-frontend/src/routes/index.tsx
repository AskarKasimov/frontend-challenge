import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import HeartSvg from "@/assets/heart.svg?react";
import { FavoritesLocalStorageRepository } from "@/data/repository/FavoritesLocalStorageRepository";
import { MockCatsRepository } from "@/data/repository/MockCatsRepository";
import { useCatsQuery } from "@/state/useCatsInfiniteQuery";
import { useFavoriteMutation } from "@/state/useFavoriteMutation";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/")({ component: Index });
const catsRepository = new MockCatsRepository();
const favoritesRepository = new FavoritesLocalStorageRepository();

function Index() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCatsQuery(catsRepository, 20);

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
