import { ClasseJudicialRepositoryDTO } from "../../../domain/repositories/classe-judicial.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface ClasseJudicialInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
  codigo: string;
}
export type PickClasseJudicialInputResolverDTO<
  T extends DeepPartial<ClasseJudicialInputResolverDTO>,
> = keyof T extends keyof ClasseJudicialInputResolverDTO ? T : never;

export type ClasseJudicialOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  nome?: string;
  codigo?: string;
};
export type PickClasseJudicialOutputResolverDTO<
  T extends DeepPartial<ClasseJudicialOutputResolverDTO>,
> = keyof T extends keyof ClasseJudicialOutputResolverDTO ? T : never;

export function classeJudicialOutputResolverDTO(
  props: Partial<ClasseJudicialRepositoryDTO>,
): ClasseJudicialOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    nome: props.nome,
    codigo: props.codigo,
  };
}
