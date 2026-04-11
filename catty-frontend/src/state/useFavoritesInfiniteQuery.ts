import { useInfiniteQuery } from "@tanstack/react-query";
import type { IFavoritesRepository } from "../domain/repository/FavoritesRepository.ts";

export const useFavoritesInfiniteQuery = (
  repository: IFavoritesRepository,
  limit: number = 20,
) => {
  return useInfiniteQuery({
    queryKey: ["favorites", "infinite"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => repository.getFavoriteCats(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
  });
};
