import type { CatImage } from "../model/CatImage";

export interface IFavoritesRepository {
  getFavoriteCats(pageParam: number, limit: number): Promise<CatImage[]>;
  addFavoriteCat(cat: CatImage): Promise<void>;
  removeFavoriteCat(catId: string): Promise<void>;
}
