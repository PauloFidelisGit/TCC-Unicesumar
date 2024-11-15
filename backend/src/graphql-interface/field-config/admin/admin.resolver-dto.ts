import { AdminRepositoryDTO } from "../../../domain/repositories/admin.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface AdminInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
  login: string;
  senha: string;
}
export type PickAdminInputResolverDTO<
  T extends DeepPartial<AdminInputResolverDTO>,
> = keyof T extends keyof AdminInputResolverDTO ? T : never;

export type AdminOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string>["toDateTime"] | null;
  nome?: string;
  login?: string;
  senha?: string;
};
export type PickAdminOutputResolverDTO<
  T extends DeepPartial<AdminOutputResolverDTO>,
> = keyof T extends keyof AdminOutputResolverDTO ? T : never;

export function adminOutputResolverDTO(
  props: Partial<AdminRepositoryDTO & { permissoes: string[] }>,
): AdminOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    nome: props.nome,
    login: props.login,
    senha: props.senha,
  };
}
