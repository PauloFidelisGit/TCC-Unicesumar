import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Password } from "../vo/password.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Admin {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  nome: string;
  login: string;
  senha: Password<string>;
}

export type PickAdmin<T extends DeepPartial<Admin>> =
  keyof T extends keyof Admin ? T : never;
