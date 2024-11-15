import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Endereco {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  advogado_uuid: Uuid<string | null>;
  pessoa_uuid: Uuid<string | null>;
}

export type PickEndereco<T extends DeepPartial<Endereco>> =
  keyof T extends keyof Endereco ? T : never;
