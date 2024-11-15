import { PRIORIDADE_ORDEM_SERVICO } from "../enums/PRIORIDADE_ORDEM_SERVICO.js";
import { STATUS_ORDEM_SERVICO } from "../enums/STATUS_ORDEM_SERVICO.js";
import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { FloatValue } from "../vo/float-value.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface OrdemServico {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  numero: number;
  descricao: string | null;
  data_abertura: Datetime<string>;
  data_conclusao: Datetime<string | null>;
  data_cancelamento: Datetime<string | null>;
  prazo_conclusao: Datetime<string | null>;
  status: STATUS_ORDEM_SERVICO;
  prioridade: PRIORIDADE_ORDEM_SERVICO;
  valor_servico: FloatValue<number>;
  criado_por_advogado_uuid: Uuid<string>;
  servico_uuid: Uuid<string>;
  fatura_uuid: Uuid<string | null> | null;
  processo_uuid: Uuid<string | null> | null;
  caso_uuid: Uuid<string | null> | null;
}

export type PickOrdemServico<T extends DeepPartial<OrdemServico>> =
  keyof T extends keyof OrdemServico ? T : never;
