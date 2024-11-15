import { z } from "zod";

export const enderecoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  logradouro: z.string().max(255),
  numero: z.string().max(10),
  complemento: z.string().max(255),
  bairro: z.string().max(255),
  cidade: z.string().max(255),
  estado: z.string().length(2),
  cep: z.string().length(10),
  advogado_uuid: z.string().uuid(),
  pessoa_uuid: z.string().uuid(),
};
