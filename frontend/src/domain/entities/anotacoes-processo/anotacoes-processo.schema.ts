import { z } from "zod";

export const anotacoesProcessoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  nome: z.string().max(255),
};
