import {
  RelacionamentoPermissaoAdvogadoRepositoryAbstract,
  RelacionamentoPermissaoAdvogadoRepositoryDTO,
} from "../../../../domain/repositories/relacionamento-permissao-advogado.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class RelacionamentoPermissaoAdvogadoMariaDB extends RelacionamentoPermissaoAdvogadoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(
    args: GetFirstParam<
      RelacionamentoPermissaoAdvogadoRepositoryAbstract["save"]
    >,
  ) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "RelacionamentoPermissaoAdvogado",
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
    args: GetFirstParam<
      RelacionamentoPermissaoAdvogadoRepositoryAbstract["bulkSave"]
    >,
  ) {
    const { query, values } = DefaultQueryBuilder.insertBulkInto(
      "RelacionamentoPermissaoAdvogado",
      args,
    );
    const result = await this.repository.batchInsert<true>(query, values);
    return result.success
      ? {
          success: true as const,
          value: result.value,
        }
      : result;
  }

  async search<R extends Partial<RelacionamentoPermissaoAdvogadoRepositoryDTO>>(
    args: GetFirstParam<
      RelacionamentoPermissaoAdvogadoRepositoryAbstract["search"]
    >,
  ) {
    const { query, values } = DefaultQueryBuilder.search(
      "RelacionamentoPermissaoAdvogado",
      args,
    );
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(
    args: GetFirstParam<
      RelacionamentoPermissaoAdvogadoRepositoryAbstract["delete"]
    >,
  ) {
    const { query, values } = DefaultQueryBuilder.delete(
      "RelacionamentoPermissaoAdvogado",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count(
      "RelacionamentoPermissaoAdvogado",
    );
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
