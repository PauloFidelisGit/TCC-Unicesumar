import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface ClasseJudicial {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  nome: string;
  codigo: string;
}

export type PickClasseJudicial<T extends DeepPartial<ClasseJudicial>> =
  keyof T extends keyof ClasseJudicial ? T : never;
