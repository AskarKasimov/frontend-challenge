export type CatImage = {
  id: string;
  url: string;
};

export interface ICatsRepository {
  fetchCats(page: number, limit: number): Promise<CatImage[]>;
}
