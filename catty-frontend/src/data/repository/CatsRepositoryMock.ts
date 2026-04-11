import type { CatImage } from "@/domain/model/CatImage.ts";
import type { ICatsRepository } from "../../domain/repository/CatsRepository.ts";

const MOCK_CATS: CatImage[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `mock-cat-${i}`,
  url: `https://cdn2.thecatapi.com/images/984.jpg?random=${i}`,
  isFavorite: false,
}));

export class CatsRepositoryMock implements ICatsRepository {
  async getAllCats(page: number, limit: number): Promise<CatImage[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const favoriteData = localStorage.getItem("favorite-cats-keys");
    const favoriteMap = favoriteData ? JSON.parse(favoriteData) : {};

    const start = page * limit;
    const end = start + limit;
    return MOCK_CATS.slice(start, end).map((c) => ({
      ...c,
      isFavorite: !!favoriteMap[c.id],
    }));
  }
}
