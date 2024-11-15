import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface TribunalRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  nome: string;
}

type Pick<T extends DeepPartial<TribunalRepositoryDTO>> =
  keyof T extends keyof TribunalRepositoryDTO ? T : never;

export const tribunalRepositoryColumns: CreateTuple<TribunalRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "nome",
] as const;

export abstract class TribunalRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract bulkSave(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
    }>[],
  ): Promise<Result<true>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<TribunalRepositoryDTO>>(args: {
    where: keyof TribunalRepositoryDTO;
    value: string | number;
    fields: (keyof TribunalRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<TribunalRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof TribunalRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<TribunalRepositoryDTO>>(args: {
    fields: (keyof TribunalRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof TribunalRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
