import { useInfiniteQuery } from "@tanstack/react-query";
import type { ICatsRepository } from "../domain/repository/CatsRepository.ts";
import type { IFavoritesRepository } from "../domain/repository/FavoritesRepository.ts";

export const useCatsQuery = (
  repository: ICatsRepository,
  favoritesRepository: IFavoritesRepository,
  limit = 20,
) => {
  return useInfiniteQuery({
    queryKey: ["cats", "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const cats = await repository.getAllCats(pageParam, limit);
      const favoriteIds = await favoritesRepository.checkFavorites(
        cats.map((c) => c.id),
      );
      const favoriteIdsSet = new Set(favoriteIds);

      return cats.map((cat) => ({
        ...cat,
        isFavorite: favoriteIdsSet.has(cat.id),
      }));
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length : undefined;
      // return lastPage.length === limit ? allPages.length : undefined;
    },
  });
};
