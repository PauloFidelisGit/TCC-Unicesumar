import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface RelacionamentoCasoProcesso {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;

  // Relacionamentos
  caso_uuid: Uuid<string>;
  processo_uuid: Uuid<string>;
}

export type PickRelacionamentoCasoProcesso<
  T extends DeepPartial<RelacionamentoCasoProcesso>,
> = keyof T extends keyof RelacionamentoCasoProcesso ? T : never;
