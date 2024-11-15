import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface AnotacoesCaso {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  titulo: string;
  descricao: string | null;
  caso_uuid: Uuid<string>;
  criado_por_advogado_uuid: Uuid<string>;
}

export type PickAnotacoesCaso<T extends DeepPartial<AnotacoesCaso>> =
  keyof T extends keyof AnotacoesCaso ? T : never;
