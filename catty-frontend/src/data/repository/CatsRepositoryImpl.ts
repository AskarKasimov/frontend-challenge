import type { CatImage } from "@/domain/model/CatImage.ts";
import type { ICatsRepository } from "@/domain/repository/CatsRepository.ts";
import { API_KEY, API_URL, STORAGE_KEY } from "@/shared/consts.ts";

export class CatsRepositoryImpl implements ICatsRepository {
  async getAllCats(page: number, limit: number): Promise<CatImage[]> {
    console.log(API_KEY);
    const response = await fetch(
      `${API_URL}/images/search?limit=${limit}&page=${page}&order=DESC`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cats: ${response.statusText}`);
    }

    const data: Array<{ id: string; url: string }> = await response.json();

    const favoriteData = localStorage.getItem(STORAGE_KEY);
    const favoriteMap = favoriteData ? JSON.parse(favoriteData) : {};

    return data.map((item) => ({
      id: item.id,
      url: item.url,
      isFavorite: !!favoriteMap[item.id],
    }));
  }
}
