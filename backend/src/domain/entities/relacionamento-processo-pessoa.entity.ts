import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "../enums/TIPO_RELACIONAMENTO_PROCESSO_PESSOA.js";
import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface RelacionamentoProcessoPessoa {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;

  // Relacionamentos
  processo_uuid: Uuid<string>;
  pessoa_uuid: Uuid<string>;
}

export type PickRelacionamentoProcessoPessoa<
  T extends DeepPartial<RelacionamentoProcessoPessoa>,
> = keyof T extends keyof RelacionamentoProcessoPessoa ? T : never;
