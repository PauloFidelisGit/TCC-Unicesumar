import { RelacionamentoCasoPessoaRepositoryAbstract } from "../../../../domain/repositories/relacionamento-caso-pessoa.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class RelacionamentoCasoPessoaMariaDB extends RelacionamentoCasoPessoaRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(
    args: GetFirstParam<RelacionamentoCasoPessoaRepositoryAbstract["save"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "RelacionamentoCasoPessoa",
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

  async delete(
    args: GetFirstParam<RelacionamentoCasoPessoaRepositoryAbstract["delete"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.delete(
      "RelacionamentoCasoPessoa",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("RelacionamentoCasoPessoa");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
