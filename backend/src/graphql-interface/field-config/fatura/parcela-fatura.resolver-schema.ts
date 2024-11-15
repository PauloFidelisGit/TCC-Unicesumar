import { x } from "../../utils/custom-zod.js";

export const parcelaFaturaSchema = {
  id: x.number({ label: "id" }).int().positive(),
  uuid: x.uuid({ label: "uuid" }),
  criado_em: x.dateISOString({ label: "criado_em" }),
  atualizado_em: x.dateISOString({ label: "atualizado_em" }).nullable(),
  fatura_uuid: x.uuid({ label: "fatura_uuid" }),
  numero: x.number({ label: "numero" }),
  valor: x.float({ label: "valor" }),
  data_vencimento: x.dateISO8601({ label: "data_vencimento" }),
  data_pagamento: x.dateISO8601({ label: "data_pagamento" }).nullable(),
  juros: x.floatString({ label: "juros" }).nullable(),
  multa: x.floatString({ label: "multa" }).nullable(),
  desconto: x.floatString({ label: "desconto" }).nullable(),
};
