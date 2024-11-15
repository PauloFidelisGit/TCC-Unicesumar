import {
  TribunalRepositoryAbstract,
  TribunalRepositoryDTO,
} from "../../../../domain/repositories/tribunal.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class TribunalMariaDB extends TribunalRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }
  async save(args: GetFirstParam<TribunalRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Tribunal", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async bulkSave(args: GetFirstParam<TribunalRepositoryAbstract["bulkSave"]>) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "Tribunal",
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

  async update(args: GetFirstParam<TribunalRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Tribunal", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<TribunalRepositoryDTO>>(
    args: GetFirstParam<TribunalRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Tribunal", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<TribunalRepositoryDTO>>(
    args: GetFirstParam<TribunalRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Tribunal", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<TribunalRepositoryDTO>>(
    args: GetFirstParam<TribunalRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Tribunal", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<TribunalRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Tribunal", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Tribunal");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
