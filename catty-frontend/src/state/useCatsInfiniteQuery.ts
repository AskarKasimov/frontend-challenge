import { useInfiniteQuery } from "@tanstack/react-query";
import type { ICatsRepository } from "../domain/repository/CatsRepository.ts";

export const useCatsQuery = (
  repository: ICatsRepository,
  limit: number = 20,
) => {
  return useInfiniteQuery({
    queryKey: ["cats", "infinite"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => repository.getAllCats(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
  });
};
