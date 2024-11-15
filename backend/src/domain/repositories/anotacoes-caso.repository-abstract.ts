import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { AdvogadoRepositoryDTO } from "./advogado.repository-abstract.js";

export interface AnotacoesCasoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  titulo: string;
  descricao: string | null;
  caso_uuid: string;
  criado_por_advogado_uuid: string;
}

type Pick<T extends DeepPartial<AnotacoesCasoRepositoryDTO>> =
  keyof T extends keyof AnotacoesCasoRepositoryDTO ? T : never;

export const anotacoesCasoRepositoryColumns: CreateTuple<AnotacoesCasoRepositoryDTO> =
  [
    "id",
    "uuid",
    "criado_em",
    "atualizado_em",
    "titulo",
    "descricao",
    "caso_uuid",
    "criado_por_advogado_uuid",
  ] as const;

export abstract class AnotacoesCasoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      titulo: string;
      descricao?: string | null;
      caso_uuid: string;
      criado_por_advogado_uuid: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      titulo?: string;
      descricao?: string | null;
      criado_por_advogado_uuid?: string;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<AnotacoesCasoRepositoryDTO>>(args: {
    where: keyof AnotacoesCasoRepositoryDTO;
    value: string | number;
    fields: (keyof AnotacoesCasoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<AnotacoesCasoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof AnotacoesCasoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<AnotacoesCasoRepositoryDTO>>(args: {
    fields: (keyof AnotacoesCasoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof AnotacoesCasoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
  abstract findAnotacoesCasoAndAllRelation<
    R extends Partial<
      AnotacoesCasoRepositoryDTO & { advogado: AdvogadoRepositoryDTO }
    >,
  >(args: {
    where: keyof AnotacoesCasoRepositoryDTO;
    value: string | number;
    fields: {
      advogado: (keyof AdvogadoRepositoryDTO)[];
      anotacoes_caso: (keyof AnotacoesCasoRepositoryDTO)[];
    };
  }): Promise<Result<R[]>>;
}
