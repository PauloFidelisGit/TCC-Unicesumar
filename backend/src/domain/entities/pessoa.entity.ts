import { ESTADO_CIVIL } from "../enums/ESTADO_CIVIL.js";
import { TIPO_PESSOA } from "../enums/TIPO_PESSOA.js";
import { DeepPartial } from "../types/index.js";
import { CNPJ } from "../vo/cnpj.vo.js";
import { CPF } from "../vo/cpf.vo.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Emails } from "../vo/emails.vo.js";
import { Password } from "../vo/password.vo.js";
import { Telefones } from "../vo/telefones.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Pessoa {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  login: string | null;
  senha: Password<string | null>;
  telefones: Telefones<string[] | null>;
  emails: Emails<string[] | null>;
  tipo_pessoa: TIPO_PESSOA;
  nome: string | null;
  data_nascimento: Datetime<string | null>;
  nacionalidade: string | null;
  profissao: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: CPF<string | null>;
  nome_fantasia: string | null;
  razao_social: string | null;
  cnpj: CNPJ<string | null>;
}

export type PickPessoa<T extends DeepPartial<Pessoa>> =
  keyof T extends keyof Pessoa ? T : never;
