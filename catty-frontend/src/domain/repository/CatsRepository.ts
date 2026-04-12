import type { CatImage } from "../model/CatImage";

export interface ICatsRepository {
  getAllCats(page: number, limit: number): Promise<CatImage[]>;
}
