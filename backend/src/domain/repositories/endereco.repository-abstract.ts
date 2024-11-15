import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export interface EnderecoRepositoryDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  advogado_uuid: string | null;
  pessoa_uuid: string | null;
}

type Pick<T extends DeepPartial<EnderecoRepositoryDTO>> =
  keyof T extends keyof EnderecoRepositoryDTO ? T : never;

export const enderecoRepositoryColumns: CreateTuple<EnderecoRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "logradouro",
  "numero",
  "complemento",
  "bairro",
  "cidade",
  "estado",
  "cep",
  "advogado_uuid",
  "pessoa_uuid",
] as const;

export abstract class EnderecoRepositoryAbstract {
  abstract save(
    args: Pick<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      logradouro?: string | null;
      numero?: string | null;
      complemento?: string | null;
      bairro?: string | null;
      cidade?: string | null;
      estado?: string | null;
      cep?: string | null;
      advogado_uuid?: string | null;
      pessoa_uuid?: string | null;
    }>,
  ): Promise<Result<Pick<{ uuid: string }>>>;
  abstract update(args: {
    uuid: string;
    data: Pick<{
      atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      logradouro?: string | null;
      numero?: string | null;
      complemento?: string | null;
      bairro?: string | null;
      cidade?: string | null;
      estado?: string | null;
      cep?: string | null;
    }>;
  }): Promise<Result<true>>;
  abstract find<R extends Partial<EnderecoRepositoryDTO>>(args: {
    where: keyof EnderecoRepositoryDTO;
    value: string | number;
    fields: (keyof EnderecoRepositoryDTO)[];
  }): Promise<Result<R>>;
  abstract list<R extends Partial<EnderecoRepositoryDTO>>(args: {
    cursor: number;
    fields: (keyof EnderecoRepositoryDTO)[];
    limit: number;
  }): Promise<Result<R[]>>;
  abstract search<R extends Partial<EnderecoRepositoryDTO>>(args: {
    fields: (keyof EnderecoRepositoryDTO)[];
    limit: number;
    value: string | number;
    where: keyof EnderecoRepositoryDTO;
  }): Promise<Result<R[]>>;
  abstract delete(args: Pick<{ uuid: string }>): Promise<Result<true>>;
  abstract count(): Promise<Result<number>>;
}
