import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Municipio {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  nome: string;
  codigo: string;
  codigo_uf: string;
}

export type PickMunicipio<T extends DeepPartial<Municipio>> =
  keyof T extends keyof Municipio ? T : never;
