import { RelacionamentoCasoProcessoRepositoryDTO } from "../../../domain/repositories/relacionamento-caso-processo.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface RelacionamentoCasoProcessoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: string;
  caso_uuid: string;
  processo_uuid: string;
}
export type PickRelacionamentoCasoProcessoInputResolverDTO<
  T extends DeepPartial<RelacionamentoCasoProcessoInputResolverDTO>,
> = keyof T extends keyof RelacionamentoCasoProcessoInputResolverDTO
  ? T
  : never;

export type RelacionamentoCasoProcessoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  caso_uuid?: string;
  processo_uuid?: string;
};
export type PickRelacionamentoCasoProcessoOutputResolverDTO<
  T extends DeepPartial<RelacionamentoCasoProcessoOutputResolverDTO>,
> = keyof T extends keyof RelacionamentoCasoProcessoOutputResolverDTO
  ? T
  : never;
export function relacionamentoCasoProcessoOutputResolverDTO(
  props: Partial<RelacionamentoCasoProcessoRepositoryDTO>,
): RelacionamentoCasoProcessoOutputResolverDTO {
  return {
    id: props?.id,
    uuid: new Uuid(props?.uuid)?.value,
    criado_em: new Datetime(props?.criado_em)?.toDateTime,
    caso_uuid: new Uuid(props?.caso_uuid)?.value,
    processo_uuid: new Uuid(props?.processo_uuid)?.value,
  };
}
