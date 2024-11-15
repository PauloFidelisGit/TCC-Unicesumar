import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Caso {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  titulo: string;
  descricao: string | null;
  data_abertura: Datetime<string>;
  data_encerramento: Datetime<string | null>;
  criado_por_advogado_uuid: Uuid<string>;
}

export type PickCaso<T extends DeepPartial<Caso>> = keyof T extends keyof Caso
  ? T
  : never;
