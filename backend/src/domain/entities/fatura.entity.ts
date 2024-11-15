import { STATUS_FATURA } from "../enums/STATUS_FATURA.js";
import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { FloatValue } from "../vo/float-value.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Fatura {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  valor_total: FloatValue<number>;
  data_emissao: Datetime<string>;
  status_fatura: STATUS_FATURA;
  observacoes: string | null;
  criado_por_advogado_uuid: Uuid<string>;
}

export type PickFatura<T extends DeepPartial<Fatura>> =
  keyof T extends keyof Fatura ? T : never;
