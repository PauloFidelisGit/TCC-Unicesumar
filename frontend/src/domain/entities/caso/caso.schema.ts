import { z } from "zod";

export const casoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  titulo: z.string().max(255),
  descricao: z.string().max(255).nullable(),
  data_abertura: z.string(),
  data_encerramento: z.string(),
  advogado_uuid: z.string().uuid(),
};
