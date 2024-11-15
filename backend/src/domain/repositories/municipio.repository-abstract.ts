import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface MunicipioRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  nome: string;
  codigo: string;
  codigo_uf: string;
}

type Pick<T extends DeepPartial<MunicipioRepositoryDTO>> =
  keyof T extends keyof MunicipioRepositoryDTO ? T : never;

export const municipioRepositoryColumns: CreateTuple<MunicipioRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "nome",
  "codigo",
  "codigo_uf",
] as const;

export abstract class MunicipioRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      codigo: string;
      codigo_uf: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract bulkSave(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      codigo: string;
      codigo_uf: string;
    }>[],
  ): Promise<Result<true>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome?: string;
      codigo?: string;
      codigo_uf?: string;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<MunicipioRepositoryDTO>>(args: {
    where: keyof MunicipioRepositoryDTO;
    value: string | number;
    fields: (keyof MunicipioRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<MunicipioRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof MunicipioRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<MunicipioRepositoryDTO>>(args: {
    fields: (keyof MunicipioRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof MunicipioRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract count(): Promise<Result<number>>;
}
