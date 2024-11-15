import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { FloatValue } from "../vo/float-value.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface ParcelaFatura {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  fatura_uuid: Uuid<string>;
  numero: number;
  valor: FloatValue<number>;
  data_vencimento: Datetime<string>;
  data_pagamento: Datetime<string | null>;
}

export type PickParcelaFatura<T extends DeepPartial<ParcelaFatura>> =
  keyof T extends keyof ParcelaFatura ? T : never;
