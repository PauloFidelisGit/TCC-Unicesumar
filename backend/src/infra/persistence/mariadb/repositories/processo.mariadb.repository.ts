import {
  ProcessoRepositoryAbstract,
  ProcessoRepositoryDTO,
} from "../../../../domain/repositories/processo.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class ProcessoMariaDB extends ProcessoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<ProcessoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Processo", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async update(args: GetFirstParam<ProcessoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Processo", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<ProcessoRepositoryDTO>>(
    args: GetFirstParam<ProcessoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Processo", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<ProcessoRepositoryDTO>>(
    args: GetFirstParam<ProcessoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Processo", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<ProcessoRepositoryDTO>>(
    args: GetFirstParam<ProcessoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Processo", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<ProcessoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Processo", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Processo");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
