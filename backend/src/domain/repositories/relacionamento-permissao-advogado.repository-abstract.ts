import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface RelacionamentoPermissaoAdvogadoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  advogado_uuid: Uuid<string>["value"];
  permissao_advogado_uuid: Uuid<string>["value"];
}

export type PickRelacionamentoPermissaoAdvogadoRepositoryDTO<T extends DeepPartial<RelacionamentoPermissaoAdvogadoRepositoryDTO>> =
  keyof T extends keyof RelacionamentoPermissaoAdvogadoRepositoryDTO ? T : never;

export const relacionamentoPermissaoRepositoryColumns: CreateTuple<RelacionamentoPermissaoAdvogadoRepositoryDTO> =
  [
    "id",
    "uuid",
    "criado_em",
    "advogado_uuid",
    "permissao_advogado_uuid",
  ] as const;

export abstract class RelacionamentoPermissaoAdvogadoRepositoryAbstract {
  abstract save(
    args: PickRelacionamentoPermissaoAdvogadoRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      advogado_uuid: Uuid<string>["value"];
      permissao_advogado_uuid: Uuid<string>["value"];
    }>,
  ): Promise<
    Result<PickRelacionamentoPermissaoAdvogadoRepositoryDTO<{ uuid: string }>>
  >;
  abstract bulkSave(
    args: PickRelacionamentoPermissaoAdvogadoRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      advogado_uuid: Uuid<string>["value"];
      permissao_advogado_uuid: Uuid<string>["value"];
    }>[],
  ): Promise<Result<true>>;
  abstract search<
    T extends Partial<RelacionamentoPermissaoAdvogadoRepositoryDTO>,
  >(args: {
    fields: (keyof RelacionamentoPermissaoAdvogadoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof RelacionamentoPermissaoAdvogadoRepositoryDTO;
  }): Promise<Result<T[]>>;
  abstract delete(
    args: PickRelacionamentoPermissaoAdvogadoRepositoryDTO<{ uuid: string }>,
  ): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
