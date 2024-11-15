import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Orgao {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  nome: string;
  tribunal_uuid: Uuid<string>;
  municipio_uuid: Uuid<string>;
}

export type PickOrgao<T extends DeepPartial<Orgao>> =
  keyof T extends keyof Orgao ? T : never;
