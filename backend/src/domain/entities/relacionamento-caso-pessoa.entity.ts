import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface RelacionamentoCasoPessoa {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;

  // Relacionamentos
  caso_uuid: Uuid<string>;
  pessoa_uuid: Uuid<string>;
}

export type PickRelacionamentoCasoPessoa<
  T extends DeepPartial<RelacionamentoCasoPessoa>,
> = keyof T extends keyof RelacionamentoCasoPessoa ? T : never;
