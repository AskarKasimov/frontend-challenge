import type { CatImage } from "../model/CatImage";

export interface IFavoritesRepository {
  getFavoriteCats(pageParam: number, limit: number): Promise<CatImage[]>;
  // checkFavorites нужен для мерджа котов из API с локальным
  // хранилищем любимчиков
  checkFavorites(catIds: string[]): Promise<string[]>;
  addFavoriteCat(cat: CatImage): Promise<void>;
  removeFavoriteCat(catId: string): Promise<void>;
}
