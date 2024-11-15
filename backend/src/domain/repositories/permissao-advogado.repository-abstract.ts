import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface PermissaoAdvogadoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  nome: string;
}

type Pick<T extends DeepPartial<PermissaoAdvogadoRepositoryDTO>> =
  keyof T extends keyof PermissaoAdvogadoRepositoryDTO ? T : never;

export const permissaoRepositoryColumns: CreateTuple<PermissaoAdvogadoRepositoryDTO> =
  ["id", "uuid", "criado_em", "nome"] as const;

export abstract class PermissaoRepositoryAbstract {
  abstract bulkSave(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
    }>[],
  ): Promise<Result<true>>;
  abstract find<R extends Partial<PermissaoAdvogadoRepositoryDTO>>(args: {
    where: keyof PermissaoAdvogadoRepositoryDTO;
    value: string | number;
    fields: (keyof PermissaoAdvogadoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract search<R extends Partial<PermissaoAdvogadoRepositoryDTO>>(args: {
    fields: (keyof PermissaoAdvogadoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof PermissaoAdvogadoRepositoryDTO;
  }): Promise<Result<R[]>>;
}
