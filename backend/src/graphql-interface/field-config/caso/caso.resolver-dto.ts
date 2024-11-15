import { CasoRepositoryDTO } from "../../../domain/repositories/caso.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface CasoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  titulo: string;
  descricao: string | null;
  data_abertura: string;
  data_encerramento: string | null;
  criado_por_advogado_uuid: string;
}
export type PickCasoInputResolverDTO<
  T extends DeepPartial<CasoInputResolverDTO>,
> = keyof T extends keyof CasoInputResolverDTO ? T : never;

export type CasoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  titulo?: string;
  descricao?: string | null;
  data_abertura?: string;
  data_encerramento?: string | null;
  criado_por_advogado_uuid?: string;
};
export type PickCasoOutputResolverDTO<
  T extends DeepPartial<CasoOutputResolverDTO>,
> = keyof T extends keyof CasoOutputResolverDTO ? T : never;

export function casoOutputResolverDTO(
  props: Partial<CasoRepositoryDTO>,
): CasoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    titulo: props.titulo,
    descricao: props.descricao,
    data_abertura: new Datetime(props.data_abertura)?.toDateTime,
    data_encerramento: new Datetime(props.data_encerramento)?.toDateTime,
    criado_por_advogado_uuid: new Uuid(props.criado_por_advogado_uuid)?.value,
  };
}
