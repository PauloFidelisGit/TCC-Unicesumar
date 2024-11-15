import { EnderecoRepositoryDTO } from "../../../domain/repositories/endereco.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface EnderecoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  advogado_uuid: string | null;
  pessoa_uuid: string | null;
}
export type PickEnderecoInputResolverDTO<
  T extends DeepPartial<EnderecoInputResolverDTO>,
> = keyof T extends keyof EnderecoInputResolverDTO ? T : never;

export type EnderecoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
  advogado_uuid?: string | null;
  pessoa_uuid?: string | null;
};
export type PickEnderecoOutputResolverDTO<
  T extends DeepPartial<EnderecoOutputResolverDTO>,
> = keyof T extends keyof EnderecoOutputResolverDTO ? T : never;

export function enderecoOutputResolverDTO(
  props: Partial<EnderecoRepositoryDTO>,
): EnderecoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    logradouro: props.logradouro,
    numero: props.numero,
    complemento: props.complemento,
    bairro: props.bairro,
    cidade: props.cidade,
    estado: props.estado,
    cep: props.cep,
    advogado_uuid: new Uuid(props.advogado_uuid)?.value,
    pessoa_uuid: new Uuid(props.pessoa_uuid)?.value,
  };
}
