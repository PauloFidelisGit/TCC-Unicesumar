import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface ParcelaFaturaRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string | null>["toDatabaseTimeStamp"];
  fatura_uuid: string;
  numero: number;
  valor: number;
  data_vencimento: Datetime<string>["toDate"];
  data_pagamento: Datetime<string | null>["toDatabaseTimeStamp"];
}

export type PickParcelaFaturaRepositoryDTO<
  T extends DeepPartial<ParcelaFaturaRepositoryDTO>,
> = keyof T extends keyof ParcelaFaturaRepositoryDTO ? T : never;

export const parcelaFaturaRepositoryColumns: CreateTuple<ParcelaFaturaRepositoryDTO> =
  [
    "id",
    "uuid",
    "criado_em",
    "atualizado_em",
    "fatura_uuid",
    "numero",
    "valor",
    "data_vencimento",
    "data_pagamento",
  ] as const;

export abstract class ParcelaFaturaRepositoryAbstract {
  abstract bulkSave(
    args: PickParcelaFaturaRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      fatura_uuid: string;
      numero: number;
      valor: number;
      data_vencimento: Datetime<string>["toDatabaseTimeStamp"];
      data_pagamento?: Datetime<string>["toDatabaseTimeStamp"];
    }>[],
  ): Promise<Result<PickParcelaFaturaRepositoryDTO<{ uuid: string }>[]>>;

  abstract find<T extends Partial<ParcelaFaturaRepositoryDTO>>(args: {
    where: keyof ParcelaFaturaRepositoryDTO;
    value: string | number;
    fields: (keyof ParcelaFaturaRepositoryDTO)[];
  }): Promise<Result<T>>;

  abstract search<T extends Partial<ParcelaFaturaRepositoryDTO>>(args: {
    fields: (keyof ParcelaFaturaRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof ParcelaFaturaRepositoryDTO;
  }): Promise<Result<T[]>>;
}
