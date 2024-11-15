import { AnotacoesCasoRepositoryDTO } from "../../../domain/repositories/anotacoes-caso.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface AnotacoesCasoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  titulo: string;
  descricao: string | null;
  caso_uuid: string;
  criado_por_advogado_uuid: string;
}
export type PickAnotacoesCasoInputResolverDTO<
  T extends DeepPartial<AnotacoesCasoInputResolverDTO>,
> = keyof T extends keyof AnotacoesCasoInputResolverDTO ? T : never;

export type AnotacoesCasoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  titulo?: string;
  descricao?: string | null;
  caso_uuid?: string;
  criado_por_advogado_uuid?: string;
};
export type PickAnotacoesCasoOutputResolverDTO<
  T extends DeepPartial<AnotacoesCasoOutputResolverDTO>,
> = keyof T extends keyof AnotacoesCasoOutputResolverDTO ? T : never;

export function anotacoesCasoOutputResolverDTO(
  props: Partial<AnotacoesCasoRepositoryDTO>,
): AnotacoesCasoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    titulo: props.titulo,
    descricao: props.descricao,
    caso_uuid: new Uuid(props.caso_uuid)?.value,
    criado_por_advogado_uuid: new Uuid(props.criado_por_advogado_uuid)?.value,
  };
}
