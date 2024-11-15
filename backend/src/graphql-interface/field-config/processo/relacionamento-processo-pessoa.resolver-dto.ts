import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "../../../domain/enums/TIPO_RELACIONAMENTO_PROCESSO_PESSOA.js";
import { RelacionamentoProcessoPessoaRepositoryDTO } from "../../../domain/repositories/relacionamento-processo-pessoa.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface RelacionamentoProcessoPessoaInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: string;
  processo_uuid: string;
  pessoa_uuid: string;
  tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
}
export type PickRelacionamentoProcessoPessoaInputResolverDTO<
  T extends DeepPartial<RelacionamentoProcessoPessoaInputResolverDTO>,
> = keyof T extends keyof RelacionamentoProcessoPessoaInputResolverDTO
  ? T
  : never;

export type RelacionamentoProcessoPessoaOutputResolverDTO = {
  id: number;
  uuid: string;
  criado_em: string;
  processo_uuid: string;
  pessoa_uuid: string;
  tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
};
export type PickRelacionamentoProcessoPessoaOutputResolverDTO<
  T extends DeepPartial<RelacionamentoProcessoPessoaOutputResolverDTO>,
> = keyof T extends keyof RelacionamentoProcessoPessoaOutputResolverDTO
  ? T
  : never;
export function relacionamentoProcessoPessoaOutputResolverDTO(
  props: Partial<RelacionamentoProcessoPessoaRepositoryDTO>,
) {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    tipo_relacionamento: props.tipo_relacionamento,
    pessoa_uuid: new Uuid(props.pessoa_uuid)?.value,
    processo_uuid: new Uuid(props.processo_uuid)?.value,
  };
}
