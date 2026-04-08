import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CatImage } from "../domain/CatsRepository.interface.ts";

interface FavoritesState {
  favorites: Record<string, CatImage>;
  toggleFavorite: (cat: CatImage) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      toggleFavorite: (cat) => {
        set((state) => {
          const newFavorites = { ...state.favorites };
          if (newFavorites[cat.id]) {
            delete newFavorites[cat.id];
          } else {
            newFavorites[cat.id] = cat;
          }
          return { favorites: newFavorites };
        });
      },
      isFavorite: (id) => !!get().favorites[id],
    }),
    {
      name: "favoriteCats",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
