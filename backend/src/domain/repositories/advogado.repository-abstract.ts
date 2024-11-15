import { AllPermissionsName } from "../../graphql-interface/security/all-permissions.js";
import { ESTADO_CIVIL } from "../enums/ESTADO_CIVIL.js";
import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";
import { PickRelacionamentoPermissaoAdvogadoRepositoryDTO } from "./relacionamento-permissao-advogado.repository-abstract.js";

export interface AdvogadoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  login: string;
  senha: string;
  telefones: string | null;
  emails: string | null;
  nome: string;
  data_nascimento: Datetime<string | null>["toDate"];
  nacionalidade: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: string | null;
  oab: string | null;
}

export type PickAdvogadoRepositoryDTO<
  T extends DeepPartial<AdvogadoRepositoryDTO>,
> = keyof T extends keyof AdvogadoRepositoryDTO ? T : never;

export const advogadoRepositoryColumns: CreateTuple<AdvogadoRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "login",
  "senha",
  "telefones",
  "emails",
  "nome",
  "data_nascimento",
  "nacionalidade",
  "estado_civil",
  "cpf",
  "oab",
] as const;

export abstract class AdvogadoRepositoryAbstract {
  abstract save(args: {
    advogado: PickAdvogadoRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      login: string;
      senha: string;
      telefones?: string | null;
      emails?: string | null;
      nome: string;
      data_nascimento?: Datetime<string | null>["toDate"];
      nacionalidade?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: string | null;
      oab?: string | null;
    }>;
    permissoes: PickRelacionamentoPermissaoAdvogadoRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      advogado_uuid: Uuid<string>["value"];
      permissao_advogado_uuid: Uuid<string>["value"];
    }>[];
  }): Promise<
    Result<{
      createAdvogado: {
        uuid: string;
      };
      createRelacionamentoPermissaoAdvogado: boolean;
    }>
  >;
  abstract update(args: {
    uuid: string;
    data: PickAdvogadoRepositoryDTO<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      login?: string;
      senha?: string;
      telefones?: string | null;
      emails?: string | null;
      nome?: string;
      data_nascimento?: Datetime<string | null>["toDate"];
      nacionalidade?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: string | null;
      oab?: string | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<AdvogadoRepositoryDTO>>(args: {
    where: keyof AdvogadoRepositoryDTO;
    value: string | number;
    fields: (keyof AdvogadoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<AdvogadoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof AdvogadoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<AdvogadoRepositoryDTO>>(args: {
    fields: (keyof AdvogadoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof AdvogadoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(
    args: PickAdvogadoRepositoryDTO<{ uuid: string }>,
  ): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
  abstract findAllPermissionsByUuid(args: {
    uuid: string;
  }): Promise<Result<string[]>>;
  abstract findAllPermissionsByUuid(args: {
    uuid: string;
  }): Promise<Result<string[]>>;
  abstract hasPermission(args: {
    advogado_uuid: string;
    permission_name: AllPermissionsName;
  }): Promise<Result<boolean>>;
}
