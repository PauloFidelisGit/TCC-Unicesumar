import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { AdvogadoRepositoryDTO } from "./advogado.repository-abstract.js";

export interface AnotacoesProcessoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  titulo: string;
  descricao: string | null;
  processo_uuid: string;
  criado_por_advogado_uuid: string;
}

type Pick<T extends DeepPartial<AnotacoesProcessoRepositoryDTO>> =
  keyof T extends keyof AnotacoesProcessoRepositoryDTO ? T : never;

export const anotacoesProcessoRepositoryColumns: CreateTuple<AnotacoesProcessoRepositoryDTO> =
  [
    "id",
    "uuid",
    "criado_em",
    "atualizado_em",
    "titulo",
    "descricao",
    "processo_uuid",
    "criado_por_advogado_uuid",
  ] as const;

export abstract class AnotacoesProcessoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      titulo: string;
      descricao?: string | null;
      processo_uuid: string;
      criado_por_advogado_uuid: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      titulo?: string;
      descricao?: string | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<AnotacoesProcessoRepositoryDTO>>(args: {
    where: keyof AnotacoesProcessoRepositoryDTO;
    value: string | number;
    fields: (keyof AnotacoesProcessoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<AnotacoesProcessoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof AnotacoesProcessoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<AnotacoesProcessoRepositoryDTO>>(args: {
    fields: (keyof AnotacoesProcessoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof AnotacoesProcessoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
  abstract findAnotacoesProcessoAndAllRelation<
    R extends Partial<
      AnotacoesProcessoRepositoryDTO & { advogado: AdvogadoRepositoryDTO }
    >,
  >(args: {
    where: keyof AnotacoesProcessoRepositoryDTO;
    value: string | number;
    fields: {
      advogado: (keyof AdvogadoRepositoryDTO)[];
      anotacoes_processo: (keyof AnotacoesProcessoRepositoryDTO)[];
    };
  }): Promise<Result<R[]>>;
}
