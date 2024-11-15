import { ESTADO_CIVIL } from "../enums/ESTADO_CIVIL.js";
import { TIPO_PESSOA } from "../enums/TIPO_PESSOA.js";
import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface PessoaRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  login: string | null;
  senha: string | null;
  telefones: string | null;
  emails: string | null;
  tipo_pessoa: TIPO_PESSOA;
  nome: string | null;
  data_nascimento: Datetime<string | null>["toDate"];
  nacionalidade: string | null;
  profissao: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: string | null;
  nome_fantasia: string | null;
  razao_social: string | null;
  cnpj: string | null;
}

type Pick<T extends DeepPartial<PessoaRepositoryDTO>> =
  keyof T extends keyof PessoaRepositoryDTO ? T : never;

export const pessoaRepositoryColumns: CreateTuple<PessoaRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "login",
  "senha",
  "telefones",
  "emails",
  "tipo_pessoa",
  "nome",
  "data_nascimento",
  "nacionalidade",
  "profissao",
  "estado_civil",
  "cpf",
  "nome_fantasia",
  "razao_social",
  "cnpj",
] as const;

export abstract class PessoaRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      login?: string | null;
      senha?: string | null;
      telefones?: string | null;
      emails?: string | null;
      tipo_pessoa: TIPO_PESSOA;
      nome?: string | null;
      data_nascimento?: Datetime<string | null>["toDate"];
      nacionalidade?: string | null;
      profissao?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: string | null;
      nome_fantasia?: string | null;
      razao_social?: string | null;
      cnpj?: string | null;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      login?: string | null;
      senha?: string | null;
      telefones?: string | null;
      emails?: string | null;
      tipo_pessoa?: TIPO_PESSOA;
      nome?: string | null;
      data_nascimento?: Datetime<string | null>["toDate"];
      nacionalidade?: string | null;
      profissao?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: string | null;
      nome_fantasia?: string | null;
      razao_social?: string | null;
      cnpj?: string | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<PessoaRepositoryDTO>>(args: {
    where: keyof PessoaRepositoryDTO;
    value: string | number;
    fields: (keyof PessoaRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<PessoaRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof PessoaRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<PessoaRepositoryDTO>>(args: {
    fields: (keyof PessoaRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof PessoaRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
