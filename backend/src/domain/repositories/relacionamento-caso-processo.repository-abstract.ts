import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { ProcessoRepositoryDTO } from "./processo.repository-abstract.js";

export interface RelacionamentoCasoProcessoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  caso_uuid: string;
  processo_uuid: string;
}

type Pick<T extends DeepPartial<RelacionamentoCasoProcessoRepositoryDTO>> =
  keyof T extends keyof RelacionamentoCasoProcessoRepositoryDTO ? T : never;

export const relacionamentoCasoProcessoRepositoryColumns: CreateTuple<RelacionamentoCasoProcessoRepositoryDTO> =
  ["id", "uuid", "criado_em", "caso_uuid", "processo_uuid"] as const;

export abstract class RelacionamentoCasoProcessoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      caso_uuid: string;
      processo_uuid: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract findProcessosRelatedCaso<
    T extends (Partial<RelacionamentoCasoProcessoRepositoryDTO> & {
      processo?: Partial<ProcessoRepositoryDTO>;
    })[],
  >(args: {
    caso_uuid: string;
    fields: {
      processo: (keyof ProcessoRepositoryDTO)[];
      relacionamento_caso_processo: (keyof RelacionamentoCasoProcessoRepositoryDTO)[];
    };
  }): Promise<Result<T>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
