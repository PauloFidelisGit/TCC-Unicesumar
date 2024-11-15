import { z } from "zod";

export const classeJudicialBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  nome: z.string().max(255),
  codigo: z.string().max(255),
};
