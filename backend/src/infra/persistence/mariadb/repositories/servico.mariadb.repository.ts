import {
  ServicoRepositoryAbstract,
  ServicoRepositoryDTO,
} from "../../../../domain/repositories/servico.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class ServicoMariaDB extends ServicoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<ServicoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Servico", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result;
  }

  async bulkSave(args: GetFirstParam<ServicoRepositoryAbstract["bulkSave"]>) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "Servico",
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

  async update(args: GetFirstParam<ServicoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Servico", args);
    const result = await this.repository.executeResult<true>(query, values);
    return result;
  }

  async find<R extends Partial<ServicoRepositoryDTO>>(
    args: GetFirstParam<ServicoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Servico", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result;
  }

  async list<R extends Partial<ServicoRepositoryDTO>>(
    args: GetFirstParam<ServicoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Servico", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result;
  }

  async search<R extends Partial<ServicoRepositoryDTO>>(
    args: GetFirstParam<ServicoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Servico", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Servico");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
