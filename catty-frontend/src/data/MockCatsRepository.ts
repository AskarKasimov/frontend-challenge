import type {
  CatImage,
  ICatsRepository,
} from "../domain/CatsRepository.interface.ts";

const MOCK_CATS: CatImage[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `mock-cat-${i}`,
  url: `https://cdn2.thecatapi.com/images/984.jpg?random=${i}`,
}));

export class MockCatsRepository implements ICatsRepository {
  async fetchCats(page: number, limit: number): Promise<CatImage[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const start = page * limit;
    const end = start + limit;
    return MOCK_CATS.slice(start, end);
  }
}
