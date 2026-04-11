import { z } from "zod";
import { type CatImageDto, CatImageDtoSchema } from "@/data/dto/CatImageDto.ts";
import { mapCatImageDtoToDomain } from "@/data/mapper/CatImageMapper.ts";
import type { CatImage } from "@/domain/model/CatImage.ts";
import type { ICatsRepository } from "@/domain/repository/CatsRepository.ts";
import { API_KEY, API_URL } from "@/shared/consts.ts";

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

    const rawData = await response.json();
    const data: Array<CatImageDto> = z.array(CatImageDtoSchema).parse(rawData);

    // мердж с фаворитами будет в useCatsInfinite типа как в usecase,
    // если бы была прям чистешая реализация clean architecture
    return data.map((item) => mapCatImageDtoToDomain(item, false));
  }
}
