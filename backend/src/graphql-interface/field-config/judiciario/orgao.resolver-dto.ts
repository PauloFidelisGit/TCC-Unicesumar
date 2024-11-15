import { OrgaoRepositoryDTO } from "../../../domain/repositories/orgao.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface OrgaoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
  tribunal_uuid: string;
  municipio_uuid: string;
}
export type PickOrgaoInputResolverDTO<
  T extends DeepPartial<OrgaoInputResolverDTO>,
> = keyof T extends keyof OrgaoInputResolverDTO ? T : never;

export type OrgaoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  nome?: string;
  tribunal_uuid?: string;
  municipio_uuid?: string;
};
export type PickOrgaoOutputResolverDTO<
  T extends DeepPartial<OrgaoOutputResolverDTO>,
> = keyof T extends keyof OrgaoOutputResolverDTO ? T : never;

export function orgaoOutputResolverDTO(
  props: Partial<OrgaoRepositoryDTO>,
): OrgaoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    nome: props.nome,
    municipio_uuid: new Uuid(props.municipio_uuid)?.value,
    tribunal_uuid: new Uuid(props.tribunal_uuid)?.value,
  };
}
