import { z } from "zod";

export const orgaoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  nome: z.string().max(255),
  tribunal_uuid: z.string().uuid(),
  municipio_uuid: z.string().uuid(),
};
