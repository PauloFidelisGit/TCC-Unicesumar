import {
  PermissaoAdvogadoRepositoryDTO,
  PermissaoRepositoryAbstract,
} from "../../../../domain/repositories/permissao-advogado.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class PermissaoAdvogadoMariaDB extends PermissaoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async bulkSave(args: GetFirstParam<PermissaoRepositoryAbstract["bulkSave"]>) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "PermissaoAdvogado",
      args,
    );
    const result = await this.repository.batchInsert(query, values);
    return result.success
      ? {
          success: true as const,
          value: true as const,
        }
      : result;
  }

  async find<R extends Partial<PermissaoAdvogadoRepositoryDTO>>(
    args: GetFirstParam<PermissaoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find(
      "PermissaoAdvogado",
      args,
    );
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<PermissaoAdvogadoRepositoryDTO>>(
    args: GetFirstParam<PermissaoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search(
      "PermissaoAdvogado",
      args,
    );
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }
}
