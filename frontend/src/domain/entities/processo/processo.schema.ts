import { z } from "zod";

export const processoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  data_autuacao: z.string(),
  numero: z.string().length(25),
  valor_causa: z.string(),
  segredo_justica: z.boolean(),
  tutela_urgencia: z.boolean(),
  advogado_uuid: z.string().uuid(),
  orgao_uuid: z.string().uuid(),
  classe_judicial_uuid: z.string().uuid(),
};
