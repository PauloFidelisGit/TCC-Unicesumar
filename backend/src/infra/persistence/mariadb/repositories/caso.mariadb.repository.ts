import {
  CasoRepositoryAbstract,
  CasoRepositoryDTO,
} from "../../../../domain/repositories/caso.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class CasoMariaDB extends CasoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<CasoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Caso", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async update(args: GetFirstParam<CasoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Caso", args);
    const result = await this.repository.executeResult(query, values);

    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<CasoRepositoryDTO>>(
    args: GetFirstParam<CasoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Caso", args);
    const result = await this.repository.getFirst<R>(query, values);

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<CasoRepositoryDTO>>(
    args: GetFirstParam<CasoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Caso", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<CasoRepositoryDTO>>(
    args: GetFirstParam<CasoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Caso", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<CasoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Caso", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Caso");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
