import { z } from "zod";

export const CatImageDtoSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type CatImageDto = z.infer<typeof CatImageDtoSchema>;
