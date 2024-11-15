import {
  PessoaRepositoryAbstract,
  PessoaRepositoryDTO,
} from "../../../../domain/repositories/pessoa.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class PessoaMariaDB extends PessoaRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<PessoaRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Pessoa", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async update(args: GetFirstParam<PessoaRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Pessoa", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<PessoaRepositoryDTO>>(
    args: GetFirstParam<PessoaRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Pessoa", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<PessoaRepositoryDTO>>(
    args: GetFirstParam<PessoaRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Pessoa", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<PessoaRepositoryDTO>>(
    args: GetFirstParam<PessoaRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Pessoa", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<PessoaRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Pessoa", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Pessoa");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
