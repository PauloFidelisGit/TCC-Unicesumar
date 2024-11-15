import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface ProcessoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  numero: string;
  data_autuacao: string | null;
  valor_causa: number | null;
  segredo_justica: boolean | null;
  tutela_urgencia: boolean | null;
  criado_por_advogado_uuid: string;
  orgao_uuid: string | null;
  classe_judicial_uuid: string | null;
}

type Pick<T extends DeepPartial<ProcessoRepositoryDTO>> =
  keyof T extends keyof ProcessoRepositoryDTO ? T : never;

export const processoRepositoryColumns: CreateTuple<ProcessoRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "numero",
  "data_autuacao",
  "valor_causa",
  "segredo_justica",
  "tutela_urgencia",
  "criado_por_advogado_uuid",
  "orgao_uuid",
  "classe_judicial_uuid",
] as const;

export abstract class ProcessoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      numero: string;
      data_autuacao?: string | null;
      valor_causa?: number | null;
      segredo_justica?: boolean | null;
      tutela_urgencia?: boolean | null;
      orgao_uuid?: string | null;
      criado_por_advogado_uuid: string;
      classe_judicial_uuid?: string | null;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      numero?: string;
      data_autuacao?: string | null;
      valor_causa?: number | null;
      segredo_justica?: boolean | null;
      tutela_urgencia?: boolean | null;
      orgao_uuid?: string | null;
      classe_judicial_uuid?: string | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<ProcessoRepositoryDTO>>(args: {
    where: keyof ProcessoRepositoryDTO;
    value: string | number;
    fields: (keyof ProcessoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<ProcessoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof ProcessoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<ProcessoRepositoryDTO>>(args: {
    fields: (keyof ProcessoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof ProcessoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
