import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface AnotacoesProcesso {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  titulo: string;
  descricao: string | null;
  processo_uuid: Uuid<string>;
  criado_por_advogado_uuid: Uuid<string>;
}

export type PickAnotacoesProcesso<T extends DeepPartial<AnotacoesProcesso>> =
  keyof T extends keyof AnotacoesProcesso ? T : never;
