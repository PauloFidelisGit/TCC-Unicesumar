import { AnotacoesProcessoRepositoryDTO } from "../../../domain/repositories/anotacoes-processo.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface AnotacoesProcessoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  titulo: string;
  descricao: string | null;
  processo_uuid: string;
  criado_por_advogado_uuid: string;
}
export type PickAnotacoesProcessoInputResolverDTO<
  T extends DeepPartial<AnotacoesProcessoInputResolverDTO>,
> = keyof T extends keyof AnotacoesProcessoInputResolverDTO ? T : never;

export type AnotacoesProcessoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string | null>["toDateTime"];
  titulo?: string;
  descricao?: string | null;
  processo_uuid?: string;
  criado_por_advogado_uuid?: string;
};
export type PickAnotacoesProcessoOutputResolverDTO<
  T extends DeepPartial<AnotacoesProcessoOutputResolverDTO>,
> = keyof T extends keyof AnotacoesProcessoOutputResolverDTO ? T : never;

export function anotacoesProcessoOutputResolverDTO(
  props: Partial<AnotacoesProcessoRepositoryDTO>,
): AnotacoesProcessoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    titulo: props.titulo,
    descricao: props.descricao,
    processo_uuid: new Uuid(props.processo_uuid)?.value,
    criado_por_advogado_uuid: new Uuid(props.criado_por_advogado_uuid)?.value,
  };
}
