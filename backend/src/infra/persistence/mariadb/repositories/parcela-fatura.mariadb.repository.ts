import {
  ParcelaFaturaRepositoryAbstract,
  ParcelaFaturaRepositoryDTO,
} from "../../../../domain/repositories/parcela-fatura.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class ParcelaFaturaMariaDB extends ParcelaFaturaRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async bulkSave(
    args: GetFirstParam<ParcelaFaturaRepositoryAbstract["bulkSave"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "ParcelaFatura",
      args,
    );

    const result = await this.repository.batchInsert<{ uuid: string }[]>(
      query,
      values,
    );

    return result.success
      ? {
          success: true as const,
          value: result.value,
        }
      : result;
  }

  async find<R extends Partial<ParcelaFaturaRepositoryDTO>>(
    args: GetFirstParam<ParcelaFaturaRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("ParcelaFatura", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<ParcelaFaturaRepositoryDTO>>(
    args: GetFirstParam<ParcelaFaturaRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("ParcelaFatura", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }
}
