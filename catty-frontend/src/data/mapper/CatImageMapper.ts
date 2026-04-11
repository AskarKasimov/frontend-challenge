import type { CatImageDto } from "@/data/dto/CatImageDto.ts";
import type { CatImage } from "@/domain/model/CatImage.ts";

export const mapCatImageDtoToDomain = (
  dto: CatImageDto,
  isFavorite: boolean,
): CatImage => {
  return {
    id: dto.id,
    url: dto.url,
    isFavorite,
  };
};
