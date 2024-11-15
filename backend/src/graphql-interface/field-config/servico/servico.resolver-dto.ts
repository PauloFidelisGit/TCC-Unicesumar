import { ServicoRepositoryDTO } from "../../../domain/repositories/servico.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface ServicoInputResolverDTO {
  id: number;
  uuid: Uuid<string>["value"];
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
}
export type PickServicoInputResolverDTO<
  T extends DeepPartial<ServicoInputResolverDTO>,
> = keyof T extends keyof ServicoInputResolverDTO ? T : never;

export type ServicoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  nome?: string;
};
export type PickServicoOutputResolverDTO<
  T extends DeepPartial<ServicoOutputResolverDTO>,
> = keyof T extends keyof ServicoOutputResolverDTO ? T : never;

export function servicoOutputResolverDTO(
  props: Partial<ServicoRepositoryDTO>,
): ServicoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid).value,
    criado_em: new Datetime(props.criado_em).toDateTime,
    nome: props.nome,
  };
}
