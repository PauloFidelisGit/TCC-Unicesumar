import {
  EnderecoRepositoryAbstract,
  EnderecoRepositoryDTO,
} from "../../../../domain/repositories/endereco.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class EnderecoMariaDB extends EnderecoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }
  async save(args: GetFirstParam<EnderecoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Endereco", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async update(args: GetFirstParam<EnderecoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Endereco", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<EnderecoRepositoryDTO>>(
    args: GetFirstParam<EnderecoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Endereco", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<EnderecoRepositoryDTO>>(
    args: GetFirstParam<EnderecoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Endereco", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<EnderecoRepositoryDTO>>(
    args: GetFirstParam<EnderecoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Endereco", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<EnderecoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Endereco", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Endereco");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
