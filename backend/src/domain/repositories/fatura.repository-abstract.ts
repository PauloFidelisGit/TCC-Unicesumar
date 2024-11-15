import { Fatura } from "../entities/fatura.entity.js";
import { STATUS_FATURA } from "../enums/STATUS_FATURA.js";
import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface FaturaRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string | null>["toDatabaseTimeStamp"];
  valor_total: number;
  data_emissao: Datetime<string>["toDatabaseTimeStamp"];
  status_fatura: STATUS_FATURA;
  observacoes: string | null;
  criado_por_advogado_uuid: string;
}

export type PickFaturaRepositoryDTO<
  T extends DeepPartial<FaturaRepositoryDTO>,
> = keyof T extends keyof FaturaRepositoryDTO ? T : never;

export const faturaRepositoryColumns: CreateTuple<Fatura> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "valor_total",
  "data_emissao",
  "status_fatura",
  "observacoes",
  "criado_por_advogado_uuid",
] as const;

export abstract class FaturaRepositoryAbstract {
  abstract createFatura(args: {
    fatura: {
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      valor_total: number;
      data_emissao: Datetime<string>["toDatabaseTimeStamp"];
      status_fatura: STATUS_FATURA;
      observacoes: string | undefined;
      criado_por_advogado_uuid: string;
    };
    parcelas: {
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      fatura_uuid: string;
      numero: number;
      valor: number;
      data_vencimento: Datetime<string>["toDate"];
    }[];
    ordens_servico: {
      uuid: string;
      data: {
        atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
        fatura_uuid: string;
      };
    }[];
  }): Promise<
    Result<{
      createFatura: {
        uuid: string;
      };
      createParcelasFatura: {
        uuid: string;
      }[];
      updateOrdemServico: boolean[];
    }>
  >;
  abstract update(args: {
    uuid: string;
    data: PickFaturaRepositoryDTO<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      valor_total?: number | undefined;
      data_emissao?: Datetime<string>["toDatabaseTimeStamp"] | undefined;
      status_fatura?: STATUS_FATURA | undefined;
      observacoes?: string | undefined | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<T extends Partial<FaturaRepositoryDTO>>(args: {
    where: keyof FaturaRepositoryDTO;
    value: string | number;
    fields: (keyof FaturaRepositoryDTO)[];
  }): Promise<Result<T>>;
  abstract list<T extends Partial<FaturaRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof FaturaRepositoryDTO)[];
    limit: number;
  }): Promise<Result<T[]>>;
  abstract search<T extends Partial<FaturaRepositoryDTO>>(args: {
    fields: (keyof FaturaRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof FaturaRepositoryDTO;
  }): Promise<Result<T[]>>;
  abstract delete(
    args: PickFaturaRepositoryDTO<{ uuid: string }>,
  ): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
