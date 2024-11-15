import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "../enums/TIPO_RELACIONAMENTO_PROCESSO_PESSOA.js";
import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

import { PessoaRepositoryDTO } from "./pessoa.repository-abstract.js";

export interface RelacionamentoProcessoPessoaRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  processo_uuid: string;
  pessoa_uuid: string;
  tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
}

type Pick<T extends DeepPartial<RelacionamentoProcessoPessoaRepositoryDTO>> =
  keyof T extends keyof RelacionamentoProcessoPessoaRepositoryDTO ? T : never;

export const relacionamentoProcessoPessoaRepositoryColumns: CreateTuple<RelacionamentoProcessoPessoaRepositoryDTO> =
  [
    "id",
    "uuid",
    "criado_em",
    "processo_uuid",
    "pessoa_uuid",
    "tipo_relacionamento",
  ] as const;

export abstract class RelacionamentoProcessoPessoaRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      processo_uuid: string;
      pessoa_uuid: string;
      tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
  abstract findPessoasRelatedProcesso<
    T extends Partial<
      RelacionamentoProcessoPessoaRepositoryDTO & {
        pessoa: PessoaRepositoryDTO;
      }
    >,
  >(args: {
    where: keyof RelacionamentoProcessoPessoaRepositoryDTO;
    value: string | number;
    fields: {
      pessoa: (keyof PessoaRepositoryDTO)[];
      relacionamento_processo: (keyof RelacionamentoProcessoPessoaRepositoryDTO)[];
    };
  }): Promise<Result<T[]>>;
}
