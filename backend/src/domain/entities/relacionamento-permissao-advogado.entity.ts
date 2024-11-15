import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface RelacionamentoPermissaoAdvogado {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  advogado_uuid: Uuid<string>;
  permissao_advogado_uuid: Uuid<string>;
}

export type PickRelacionamentoPermissaoAdvogado<
  T extends DeepPartial<RelacionamentoPermissaoAdvogado>,
> = keyof T extends keyof RelacionamentoPermissaoAdvogado ? T : never;
