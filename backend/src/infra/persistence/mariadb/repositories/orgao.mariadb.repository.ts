import {
  OrgaoRepositoryAbstract,
  OrgaoRepositoryDTO,
} from "../../../../domain/repositories/orgao.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class OrgaoMariaDB extends OrgaoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<OrgaoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Orgao", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async bulkSave(args: GetFirstParam<OrgaoRepositoryAbstract["bulkSave"]>) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto("Orgao", args);
    const result = await this.repository.batchInsert(query, values);
    return result.success
      ? {
          success: true as const,
          value: true as const,
        }
      : result;
  }

  async update(args: GetFirstParam<OrgaoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Orgao", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<OrgaoRepositoryDTO>>(
    args: GetFirstParam<OrgaoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Orgao", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<OrgaoRepositoryDTO>>(
    args: GetFirstParam<OrgaoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Orgao", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<OrgaoRepositoryDTO>>(
    args: GetFirstParam<OrgaoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Orgao", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<OrgaoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Orgao", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Orgao");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
