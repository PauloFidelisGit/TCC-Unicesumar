import { ESTADO_CIVIL } from "../../../domain/enums/ESTADO_CIVIL.js";
import { AdvogadoRepositoryDTO } from "../../../domain/repositories/advogado.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { CPF } from "../../../domain/vo/cpf.vo.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Emails } from "../../../domain/vo/emails.vo.js";
import { Oab } from "../../../domain/vo/oab.vo.js";
import { Telefones } from "../../../domain/vo/telefones.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface AdvogadoInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  login: string;
  senha: string;
  telefones: string[] | null;
  emails: string[] | null;
  nome: string;
  data_nascimento: string | null;
  nacionalidade: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: string | null;
  oab: { numero: string; uf: string; letra: string }[] | null;
}
export type PickAdvogadoInputResolverDTO<
  T extends DeepPartial<AdvogadoInputResolverDTO>,
> = keyof T extends keyof AdvogadoInputResolverDTO ? T : never;

export type AdvogadoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  login?: string;
  senha?: string;
  telefones?: string[] | null;
  emails?: string[] | null;
  nome?: string;
  data_nascimento?: string | null;
  nacionalidade?: string | null;
  estado_civil?: ESTADO_CIVIL | null;
  cpf?: string | null;
  oab?: { numero: string; uf: string; letra: string }[] | null;
};
export type PickAdvogadoOutputResolverDTO<
  T extends DeepPartial<AdvogadoOutputResolverDTO>,
> = keyof T extends keyof AdvogadoOutputResolverDTO ? T : never;

export function advogadoOutputResolverDTO(
  props: Partial<AdvogadoRepositoryDTO>,
): AdvogadoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    senha: props.senha,
    telefones: Telefones.createFromStringOrUndefinedOrNull(props.telefones)
      ?.value,
    emails: Emails.createFromStringOrUndefinedOrNull(props.emails)?.value,
    nome: props.nome,
    login: props.login,
    data_nascimento: new Datetime(props.data_nascimento)?.toDate,
    nacionalidade: props.nacionalidade,
    estado_civil: props.estado_civil,
    cpf: new CPF(props.cpf)?.value,
    oab: Oab.createFromStringOrUndefinedOrNull(props.oab)?.value,
  };
}
