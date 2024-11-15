import {
  MunicipioRepositoryAbstract,
  MunicipioRepositoryDTO,
} from "../../../../domain/repositories/municipio.repository-abstract.js";
import { Result } from "../../../../domain/types/index.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class MunicipioMariaDB extends MunicipioRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<MunicipioRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Municipio", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async bulkSave(
    args: {
      uuid?: string;
      criado_em: string;
      nome: string;
      codigo: string;
      codigo_uf: string;
    }[],
  ): Promise<Result<true>> {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "Municipio",
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

  async update(args: GetFirstParam<MunicipioRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Municipio", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<MunicipioRepositoryDTO>>(
    args: GetFirstParam<MunicipioRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Municipio", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<MunicipioRepositoryDTO>>(
    args: GetFirstParam<MunicipioRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Municipio", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<MunicipioRepositoryDTO>>(
    args: GetFirstParam<MunicipioRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Municipio", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Municipio");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
