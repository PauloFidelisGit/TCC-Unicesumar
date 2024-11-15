import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface RelacionamentoCasoPessoaRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  caso_uuid: string;
  pessoa_uuid: string;
}

type Pick<T extends DeepPartial<RelacionamentoCasoPessoaRepositoryDTO>> =
  keyof T extends keyof RelacionamentoCasoPessoaRepositoryDTO ? T : never;

export const relacionamentoCasoPessoaRepositoryColumns: CreateTuple<RelacionamentoCasoPessoaRepositoryDTO> =
  ["id", "uuid", "criado_em", "caso_uuid", "pessoa_uuid"] as const;

export abstract class RelacionamentoCasoPessoaRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      caso_uuid: string;
      pessoa_uuid: string;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
