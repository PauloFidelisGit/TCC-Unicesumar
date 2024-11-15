import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface PermissaoAdvogado {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  nome: string;
}

export type PickPermissoes<T extends DeepPartial<PermissaoAdvogado>> =
  keyof T extends keyof PermissaoAdvogado ? T : never;
