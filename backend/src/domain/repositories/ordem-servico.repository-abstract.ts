import { OrdemServico } from "../entities/ordem-servico.entity.js";
import { PRIORIDADE_ORDEM_SERVICO } from "../enums/PRIORIDADE_ORDEM_SERVICO.js";
import { STATUS_ORDEM_SERVICO } from "../enums/STATUS_ORDEM_SERVICO.js";
import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { FloatValue } from "../vo/float-value.js";

export interface OrdemServicoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string | null>["toDatabaseTimeStamp"];
  numero: number;
  descricao: string | null;
  data_abertura: Datetime<string>["toDatabaseTimeStamp"];
  data_conclusao: Datetime<string | null>["toDatabaseTimeStamp"];
  data_cancelamento: Datetime<string | null>["toDatabaseTimeStamp"];
  prazo_conclusao: Datetime<string | null>["toDatabaseTimeStamp"];
  status: STATUS_ORDEM_SERVICO;
  prioridade: PRIORIDADE_ORDEM_SERVICO;
  valor_servico: FloatValue<number>["value"];

  // Relacionamentos
  criado_por_advogado_uuid: string;
  servico_uuid: string;
  fatura_uuid: string | null;
  processo_uuid: string | null;
  caso_uuid: string | null;
}

export type PickOrdemServicoRepositoryDTO<
  T extends DeepPartial<OrdemServicoRepositoryDTO>,
> = keyof T extends keyof OrdemServicoRepositoryDTO ? T : never;

export const ordemServicoRepositoryColumns: CreateTuple<OrdemServico> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "numero",
  "descricao",
  "data_abertura",
  "data_conclusao",
  "data_cancelamento",
  "prazo_conclusao",
  "status",
  "prioridade",
  "valor_servico",

  // Relacionamentos
  "criado_por_advogado_uuid",
  "servico_uuid",
  "fatura_uuid",
  "processo_uuid",
  "caso_uuid",
] as const;

export abstract class OrdemServicoRepositoryAbstract {
  abstract save(
    args: PickOrdemServicoRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      descricao?: string | null;
      data_abertura: Datetime<string>["toDatabaseTimeStamp"];
      data_conclusao?: Datetime<string | null>["toDatabaseTimeStamp"];
      data_cancelamento?: Datetime<string | null>["toDatabaseTimeStamp"];
      prazo_conclusao?: Datetime<string | null>["toDatabaseTimeStamp"];
      status: STATUS_ORDEM_SERVICO;
      prioridade: PRIORIDADE_ORDEM_SERVICO;
      valor_servico: FloatValue<number>["value"];
      criado_por_advogado_uuid: string;
      servico_uuid: string;
      processo_uuid?: string | null;
      caso_uuid?: string | null;
    }>,
  ): Promise<Result<PickOrdemServicoRepositoryDTO<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: PickOrdemServicoRepositoryDTO<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      numero?: number;
      descricao?: string | null;
      data_abertura?: Datetime<string>["toDatabaseTimeStamp"];
      data_conclusao?: Datetime<string | null>["toDatabaseTimeStamp"];
      data_cancelamento?: Datetime<string | null>["toDatabaseTimeStamp"];
      prazo_conclusao?: Datetime<string | null>["toDatabaseTimeStamp"];
      status?: STATUS_ORDEM_SERVICO;
      prioridade?: PRIORIDADE_ORDEM_SERVICO;
      valor_servico?: FloatValue<number>["value"];
      servico_uuid?: string;
      fatura_uuid?: string | null;
      processo_uuid?: string | null;
      caso_uuid?: string | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<T extends Partial<OrdemServicoRepositoryDTO>>(args: {
    where: keyof OrdemServicoRepositoryDTO;
    value: string | number;
    fields: (keyof OrdemServicoRepositoryDTO)[];
  }): Promise<Result<T>>;
  abstract list<T extends Partial<OrdemServicoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof OrdemServicoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<T[]>>;
  abstract search<T extends Partial<OrdemServicoRepositoryDTO>>(args: {
    fields: (keyof OrdemServicoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof OrdemServicoRepositoryDTO;
  }): Promise<Result<T[]>>;
  abstract searchOrdemServicoForCreateFatura<
    T extends Partial<OrdemServicoRepositoryDTO>,
  >(args: {
    fields: (keyof OrdemServicoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof OrdemServicoRepositoryDTO;
  }): Promise<Result<T[]>>;
  abstract delete(
    args: PickOrdemServicoRepositoryDTO<{ uuid: string }>,
  ): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
