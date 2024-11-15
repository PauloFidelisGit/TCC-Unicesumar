import {
  ClasseJudicialRepositoryAbstract,
  ClasseJudicialRepositoryDTO,
} from "../../../../domain/repositories/classe-judicial.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class ClasseJudicialMariaDB extends ClasseJudicialRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<ClasseJudicialRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "ClasseJudicial",
      args,
    );
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async bulkSave(
    args: GetFirstParam<ClasseJudicialRepositoryAbstract["bulkSave"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "ClasseJudicial",
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

  async update(
    args: GetFirstParam<ClasseJudicialRepositoryAbstract["update"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.update(
      "ClasseJudicial",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<ClasseJudicialRepositoryDTO>>(
    args: GetFirstParam<ClasseJudicialRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("ClasseJudicial", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<ClasseJudicialRepositoryDTO>>(
    args: GetFirstParam<ClasseJudicialRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("ClasseJudicial", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<ClasseJudicialRepositoryDTO>>(
    args: GetFirstParam<ClasseJudicialRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search(
      "ClasseJudicial",
      args,
    );
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(
    args: GetFirstParam<ClasseJudicialRepositoryAbstract["delete"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.delete(
      "ClasseJudicial",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("ClasseJudicial");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
