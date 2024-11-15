import { Servico } from "../entities/servico.entity.js";
import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface ServicoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string | null>["toDatabaseTimeStamp"];
  nome: string;
}
type Pick<T extends DeepPartial<ServicoRepositoryDTO>> =
  keyof T extends keyof ServicoRepositoryDTO ? T : never;

export const servicoRepositoryColumns: CreateTuple<Servico> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "nome",
] as const;

export abstract class ServicoRepositoryAbstract {
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
  abstract find<T extends Partial<ServicoRepositoryDTO>>(args: {
    where: keyof ServicoRepositoryDTO;
    value: string | number;
    fields: (keyof ServicoRepositoryDTO)[];
  }): Promise<Result<T>>;
  abstract list<T extends Partial<ServicoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof ServicoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<T[]>>;
  abstract search<T extends Partial<ServicoRepositoryDTO>>(args: {
    fields: (keyof ServicoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof ServicoRepositoryDTO;
  }): Promise<Result<T[]>>;
  abstract count(): Promise<Result<number>>;
}
