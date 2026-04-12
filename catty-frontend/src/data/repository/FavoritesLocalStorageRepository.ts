import type { CatImage } from "@/domain/model/CatImage";
import { STORAGE_KEY } from "@/shared/consts";
import type { IFavoritesRepository } from "../../domain/repository/FavoritesRepository";

// осознанно не использую отдельный dto для локалки.
// плодить лишние мапперы и модели для базового
// хранилища было бы реально оверинжинирингово
export class FavoritesLocalStorageRepository implements IFavoritesRepository {
  private getStorage(): Record<string, CatImage> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  private setStorage(data: Record<string, CatImage>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async getFavoriteCats(pageParam: number, limit: number): Promise<CatImage[]> {
    const data = this.getStorage();
    const values = Object.values(data)
      .reverse()
      .map((cat) => ({ ...cat, isFavorite: true }));
    const start = pageParam * limit;
    const end = start + limit;

    return values.slice(start, end);
  }

  async checkFavorites(catIds: string[]): Promise<string[]> {
    const data = this.getStorage();
    return catIds.filter((id) => !!data[id]);
  }

  async addFavoriteCat(cat: CatImage): Promise<void> {
    const data = this.getStorage();
    data[cat.id] = cat;
    this.setStorage(data);
  }

  async removeFavoriteCat(catId: string): Promise<void> {
    const data = this.getStorage();
    delete data[catId];
    this.setStorage(data);
  }
}
