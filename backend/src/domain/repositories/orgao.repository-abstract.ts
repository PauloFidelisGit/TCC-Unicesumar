import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface OrgaoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  nome: string;
  tribunal_uuid: string;
  municipio_uuid: string;
}

type Pick<T extends DeepPartial<OrgaoRepositoryDTO>> =
  keyof T extends keyof OrgaoRepositoryDTO ? T : never;

export const orgaoRepositoryColumns: CreateTuple<OrgaoRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "nome",
  "tribunal_uuid",
  "municipio_uuid",
] as const;

export abstract class OrgaoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      tribunal_uuid: string;
      municipio_uuid: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract bulkSave(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      tribunal_uuid: string;
      municipio_uuid: string;
    }>[],
  ): Promise<Result<true>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome?: string;
      tribunal_uuid?: string;
      municipio_uuid?: string;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<OrgaoRepositoryDTO>>(args: {
    where: keyof OrgaoRepositoryDTO;
    value: string | number;
    fields: (keyof OrgaoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<OrgaoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof OrgaoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<OrgaoRepositoryDTO>>(args: {
    fields: (keyof OrgaoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof OrgaoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
