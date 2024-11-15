import { STATUS_ORDEM_SERVICO } from "../../../../domain/enums/STATUS_ORDEM_SERVICO.js";
import {
  OrdemServicoRepositoryAbstract,
  OrdemServicoRepositoryDTO,
} from "../../../../domain/repositories/ordem-servico.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import {
  DefaultQueryBuilder,
  formatSelectFields,
  parseSetFields,
} from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class OrdemServicoMariaDB extends OrdemServicoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<OrdemServicoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "OrdemServico",
      args,
    );
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result;
  }

  async update(args: GetFirstParam<OrdemServicoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("OrdemServico", args);
    const result = await this.repository.executeResult<true>(query, values);
    return result;
  }

  async find<R extends Partial<OrdemServicoRepositoryDTO>>(
    args: GetFirstParam<OrdemServicoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("OrdemServico", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result;
  }

  async list<R extends Partial<OrdemServicoRepositoryDTO>>(
    args: GetFirstParam<OrdemServicoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("OrdemServico", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result;
  }

  async search<R extends Partial<OrdemServicoRepositoryDTO>>(
    args: GetFirstParam<OrdemServicoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("OrdemServico", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result;
  }

  async delete(args: GetFirstParam<OrdemServicoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Orgao", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  /**
	 * @description Busca ordens de serviço que ainda não foram faturadas,
	 * as quais devem possuir fatura_uuid = null e status = 'CONCLUIDA'
	 */
  async searchOrdemServicoForCreateFatura<
    T extends Partial<OrdemServicoRepositoryDTO>,
  >(
    args: GetFirstParam<
      OrdemServicoRepositoryAbstract["searchOrdemServicoForCreateFatura"]
    >,
  ) {
    const fields = formatSelectFields(parseSetFields([...args.fields, "uuid"]));

    const query = /*sql*/ `
		SELECT ${fields}
		FROM OrdemServico
		WHERE fatura_uuid IS NULL
		AND status = '${STATUS_ORDEM_SERVICO.CONCLUIDA}'
		AND ${args.where} LIKE ?
		ORDER BY id DESC
		LIMIT ${args.limit};`;

    const values = [`%${args.value}%`];

    const result = await this.repository.executeAsArray<T[]>(query, values);

    return result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("OrdemServico");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
