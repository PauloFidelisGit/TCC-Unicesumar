import { ESTADO_CIVIL } from "../enums/ESTADO_CIVIL.js";
import { DeepPartial } from "../types/index.js";
import { CPF } from "../vo/cpf.vo.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Emails } from "../vo/emails.vo.js";
import { Oab, OabType } from "../vo/oab.vo.js";
import { Password } from "../vo/password.vo.js";
import { Telefones } from "../vo/telefones.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Advogado {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  login: string;
  senha: Password<string>;
  telefones: Telefones<string[] | null>;
  emails: Emails<string[] | null>;
  nome: string;
  data_nascimento: Datetime<string | null>;
  nacionalidade: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: CPF<string | null>;
  oab: Oab<OabType[] | null>;
}

export type PickAdvogado<T extends DeepPartial<Advogado>> =
  keyof T extends keyof Advogado ? T : never;
