import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "@/domain/enums";
import { z } from "zod";

export const relacionamentoProcessoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  processo_uuid: z.string().uuid(),
  pessoa_uuid: z.string().uuid(),
  tipo_relacionamento: z.nativeEnum(TIPO_RELACIONAMENTO_PROCESSO_PESSOA),
};
