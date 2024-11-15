import { MunicipioRepositoryDTO } from "../../../domain/repositories/municipio.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface MunicipioInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
  codigo: string;
  codigo_uf: string;
}
export type PickMunicipioInputResolverDTO<
  T extends DeepPartial<MunicipioInputResolverDTO>,
> = keyof T extends keyof MunicipioInputResolverDTO ? T : never;

export type MunicipioOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string | null>["toDateTime"];
  nome?: string;
  codigo?: string;
  codigo_uf?: string;
};
export type PickMunicipioOutputResolverDTO<
  T extends DeepPartial<MunicipioOutputResolverDTO>,
> = keyof T extends keyof MunicipioOutputResolverDTO ? T : never;

export function municipioOutputResolverDTO(
  props: Partial<MunicipioRepositoryDTO>,
): MunicipioOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    nome: props.nome,
    codigo: props.codigo,
    codigo_uf: props.codigo_uf,
  };
}
