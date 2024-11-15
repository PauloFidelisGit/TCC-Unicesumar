import { CreateTuple, DeepPartial, Result } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";

export type AdminRepositoryDTO = {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  atualizado_em: Datetime<string>["toDatabaseTimeStamp"] | null;
  nome: string;
  login: string;
  senha: string;
};

export type PickAdminRepositoryDTO<T extends DeepPartial<AdminRepositoryDTO>> =
  keyof T extends keyof AdminRepositoryDTO ? T : never;

export const adminRepositoryColumns: CreateTuple<AdminRepositoryDTO> = [
  "id",
  "uuid",
  "criado_em",
  "atualizado_em",
  "nome",
  "login",
  "senha",
];

export abstract class AdminRepositoryAbstract {
  abstract save(
    args: PickAdminRepositoryDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      nome: string;
      login: string;
      senha: string;
    }>,
  ): Promise<Result<PickAdminRepositoryDTO<{ uuid: string }>>>;
  abstract find<R extends Partial<AdminRepositoryDTO>>(args: {
    where: keyof AdminRepositoryDTO;
    value: string | number;
    fields: (keyof AdminRepositoryDTO)[];
  }): Promise<Result<R>>;
}
