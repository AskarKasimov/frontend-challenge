import { useCallback, useRef } from "react";

type UseInfiniteScrollProps = {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  rootMargin?: string;
};

export const useInfiniteScroll = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  rootMargin = "100px",
}: UseInfiniteScrollProps) => {
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
        { rootMargin },
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage, rootMargin],
  );

  return observerTarget;
};
