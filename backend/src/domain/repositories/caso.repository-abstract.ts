import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface CasoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string | null>["toDatabaseTimeStamp"];
  titulo: string;
  descricao: string | null;
  data_abertura: Datetime<string>["toDatabaseTimeStamp"];
  data_encerramento: Datetime<string | null>["toDatabaseTimeStamp"];
  criado_por_advogado_uuid: string;
}

type Pick<T extends DeepPartial<CasoRepositoryDTO>> =
  keyof T extends keyof CasoRepositoryDTO ? T : never;

export const casoRepositoryColumns: CreateTuple<CasoRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "titulo",
  "descricao",
  "data_abertura",
  "data_encerramento",
  "criado_por_advogado_uuid",
] as const;

export abstract class CasoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      titulo: string;
      descricao?: string | null;
      data_abertura?: Datetime<string>["toDatabaseTimeStamp"];
      data_encerramento?: Datetime<string | null>["toDatabaseTimeStamp"];
      criado_por_advogado_uuid: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      titulo?: string;
      descricao?: string | null;
      data_abertura?: Datetime<string>["toDatabaseTimeStamp"];
      data_encerramento?: Datetime<string | null>["toDatabaseTimeStamp"];
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<CasoRepositoryDTO>>(args: {
    where: keyof CasoRepositoryDTO;
    value: string | number;
    fields: (keyof CasoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<CasoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof CasoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<CasoRepositoryDTO>>(args: {
    fields: (keyof CasoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof CasoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
