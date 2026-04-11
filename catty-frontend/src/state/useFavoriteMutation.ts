import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CatImage } from "@/domain/model/CatImage.ts";
import type { IFavoritesRepository } from "../domain/repository/FavoritesRepository.ts";

type ToggleFavoriteArgs = {
  cat: CatImage;
  isFavorite: boolean;
};

export const useFavoriteMutation = (repository: IFavoritesRepository) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cat, isFavorite }: ToggleFavoriteArgs) => {
      if (isFavorite) {
        await repository.removeFavoriteCat(cat.id);
      } else {
        await repository.addFavoriteCat(cat);
      }
    },
    onMutate: async ({ cat, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ["cats"] });

      const previousCats = queryClient.getQueriesData({ queryKey: ["cats"] });

      queryClient.setQueriesData(
        { queryKey: ["cats"] },
        (old: { pages: CatImage[][] } | undefined) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page: CatImage[]) =>
              page.map((c) =>
                c.id === cat.id ? { ...c, isFavorite: !isFavorite } : c,
              ),
            ),
          };
        },
      );

      return { previousCats };
    },
    onError: (_err, _newVal, context) => {
      if (context?.previousCats) {
        context.previousCats.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
