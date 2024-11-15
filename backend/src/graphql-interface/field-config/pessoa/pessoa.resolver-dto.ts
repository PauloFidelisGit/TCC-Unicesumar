import { ESTADO_CIVIL } from "../../../domain/enums/ESTADO_CIVIL.js";
import { TIPO_PESSOA } from "../../../domain/enums/TIPO_PESSOA.js";
import { PessoaRepositoryDTO } from "../../../domain/repositories/pessoa.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { CNPJ } from "../../../domain/vo/cnpj.vo.js";
import { CPF } from "../../../domain/vo/cpf.vo.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Emails } from "../../../domain/vo/emails.vo.js";
import { Telefones } from "../../../domain/vo/telefones.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface PessoaInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  login: string | null;
  senha: string | null;
  telefones: string[] | null;
  emails: string[] | null;
  tipo_pessoa: TIPO_PESSOA;
  nome: string | null;
  data_nascimento: string | null;
  nacionalidade: string | null;
  profissao: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: string | null;
  nome_fantasia: string | null;
  razao_social: string | null;
  cnpj: string | null;
}
export type PickPessoaInputResolverDTO<
  T extends DeepPartial<PessoaInputResolverDTO>,
> = keyof T extends keyof PessoaInputResolverDTO ? T : never;

export type PessoaOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string | null>["toDateTime"];
  login?: string | null;
  senha?: string | null;
  telefones?: string[] | null;
  emails?: string[] | null;
  tipo_pessoa?: TIPO_PESSOA;
  nome?: string | null;
  data_nascimento?: string | null;
  nacionalidade?: string | null;
  profissao?: string | null;
  estado_civil?: ESTADO_CIVIL | null;
  cpf?: string | null;
  nome_fantasia?: string | null;
  razao_social?: string | null;
  cnpj?: string | null;
};
export type PickPessoaOutputResolverDTO<
  T extends DeepPartial<PessoaOutputResolverDTO>,
> = keyof T extends keyof PessoaOutputResolverDTO ? T : never;

export function pessoaOutputResolverDTO(
  props: Partial<PessoaRepositoryDTO>,
): PessoaOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    login: props.login,
    senha: props.senha,
    telefones: Telefones.createFromStringOrUndefinedOrNull(props.telefones)
      ?.value,
    emails: Emails.createFromStringOrUndefinedOrNull(props.emails)?.value,
    tipo_pessoa: props.tipo_pessoa,
    nome: props.nome,
    data_nascimento: new Datetime(props.data_nascimento)?.toDate,
    nacionalidade: props.nacionalidade,
    profissao: props.profissao,
    estado_civil: props.estado_civil,
    cpf: new CPF(props.cpf)?.value,
    nome_fantasia: props.nome_fantasia,
    razao_social: props.razao_social,
    cnpj: new CNPJ(props.cnpj)?.value,
  };
}
