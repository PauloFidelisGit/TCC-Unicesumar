import { TribunalRepositoryDTO } from "../../../domain/repositories/tribunal.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface TribunalInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
}
export type PickTribunalInputResolverDTO<
  T extends DeepPartial<TribunalInputResolverDTO>,
> = keyof T extends keyof TribunalInputResolverDTO ? T : never;

export type TribunalOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  nome?: string;
};
export type PickTribunalOutputResolverDTO<
  T extends DeepPartial<TribunalOutputResolverDTO>,
> = keyof T extends keyof TribunalOutputResolverDTO ? T : never;

export function tribunalOutputResolverDTO(
  props: Partial<TribunalRepositoryDTO>,
): TribunalOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    nome: props.nome,
  };
}
