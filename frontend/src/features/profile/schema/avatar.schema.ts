import { z } from "zod";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 400 * 1024;

export const avatarSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Selecione uma imagem")
    .refine(
      (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
      "Formato inválido. Use JPG, PNG ou WEBP",
    )
    .refine((files) => files?.[0]?.size <= MAX_SIZE, "Tamanho máximo: 400KB"),
});

export type avatarSchemaType = z.infer<typeof avatarSchema>;
