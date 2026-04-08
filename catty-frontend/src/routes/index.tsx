import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useCatsQuery } from "@/application/useCatsQuery";
import HeartSvg from "@/assets/heart.svg?react";
import { MockCatsRepository } from "@/data/MockCatsRepository";
import { useFavoritesStore } from "@/state/favoritesStore";
import { Card, Grid } from "@/ui/index.ts";

export const Route = createFileRoute("/")({ component: Index });
const catsRepository = new MockCatsRepository();

function Index() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCatsQuery(catsRepository, 20);

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites); // <-- Listen to pure object to trigger reactivity
  const isFavorite = (id: string) => !!favorites[id];

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
            isActionPressed={isFavorite(cat.id)}
            onActionPressed={() => toggleFavorite(cat)}
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
