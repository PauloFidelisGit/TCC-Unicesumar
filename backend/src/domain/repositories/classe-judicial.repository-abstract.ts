import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface ClasseJudicialRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  nome: string;
  codigo: string;
}

type Pick<T extends DeepPartial<ClasseJudicialRepositoryDTO>> =
  keyof T extends keyof ClasseJudicialRepositoryDTO ? T : never;

export const classeJudicialRepositoryColumns: CreateTuple<ClasseJudicialRepositoryDTO> =
  ["id", "uuid", "criado_em", "atualizado_em", "nome", "codigo"] as const;

export abstract class ClasseJudicialRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      codigo: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract bulkSave(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      codigo: string;
    }>[],
  ): Promise<Result<true>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome?: string;
      codigo?: string;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<ClasseJudicialRepositoryDTO>>(args: {
    where: keyof ClasseJudicialRepositoryDTO;
    value: string | number;
    fields: (keyof ClasseJudicialRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<ClasseJudicialRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof ClasseJudicialRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<ClasseJudicialRepositoryDTO>>(args: {
    fields: (keyof ClasseJudicialRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof ClasseJudicialRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
