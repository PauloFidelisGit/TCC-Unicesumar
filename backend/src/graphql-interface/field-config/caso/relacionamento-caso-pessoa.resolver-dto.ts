import { RelacionamentoCasoPessoaRepositoryDTO } from "../../../domain/repositories/relacionamento-caso-pessoa.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface RelacionamentoCasoPessoaInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: string;
  caso_uuid: string;
  pessoa_uuid: string;
}
export type PickRelacionamentoCasoPessoaInputResolverDTO<
  T extends DeepPartial<RelacionamentoCasoPessoaInputResolverDTO>,
> = keyof T extends keyof RelacionamentoCasoPessoaInputResolverDTO ? T : never;

export type RelacionamentoCasoPessoaOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  caso_uuid?: string;
  pessoa_uuid?: string;
};
export type PickRelacionamentoCasoPessoaOutputResolverDTO<
  T extends DeepPartial<RelacionamentoCasoPessoaOutputResolverDTO>,
> = keyof T extends keyof RelacionamentoCasoPessoaOutputResolverDTO ? T : never;

export function relacionamentoCasoPessoaOutputResolverDTO(
  props: Partial<RelacionamentoCasoPessoaRepositoryDTO>,
): RelacionamentoCasoPessoaOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid).value,
    criado_em: new Datetime(props.criado_em).toDateTime,
    caso_uuid: new Uuid(props.caso_uuid).value,
    pessoa_uuid: new Uuid(props.pessoa_uuid).value,
  };
}
