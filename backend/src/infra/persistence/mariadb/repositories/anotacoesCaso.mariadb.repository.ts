import { AdvogadoRepositoryDTO } from "../../../../domain/repositories/advogado.repository-abstract.js";
import {
  AnotacoesCasoRepositoryAbstract,
  AnotacoesCasoRepositoryDTO,
} from "../../../../domain/repositories/anotacoes-caso.repository-abstract.js";

import { GetFirstParam } from "../types/index.js";
import {
  DefaultQueryBuilder,
  formatSelectFields,
  parseSetFields,
} from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class AnotacoesCasoMariaDB extends AnotacoesCasoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<AnotacoesCasoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "AnotacoesCaso",
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

  async update(args: GetFirstParam<AnotacoesCasoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("AnotacoesCaso", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<AnotacoesCasoRepositoryDTO>>(
    args: GetFirstParam<AnotacoesCasoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("AnotacoesCaso", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<AnotacoesCasoRepositoryDTO>>(
    args: GetFirstParam<AnotacoesCasoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("AnotacoesCaso", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<AnotacoesCasoRepositoryDTO>>(
    args: GetFirstParam<AnotacoesCasoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("AnotacoesCaso", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<AnotacoesCasoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("AnotacoesCaso", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("AnotacoesCaso");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }

  async findAnotacoesCasoAndAllRelation<
    T extends Partial<AdvogadoRepositoryDTO>,
  >(
    args: GetFirstParam<
      AnotacoesCasoRepositoryAbstract["findAnotacoesCasoAndAllRelation"]
    >,
  ) {
    const fieldsAdvogado = formatSelectFields(
      parseSetFields([...args.fields.advogado, "uuid"]),
      {
        prefix: "Advogado",
        toJsonObject: true,
      },
    );

    const fieldsAnotacoesCaso = formatSelectFields(
      parseSetFields([...args.fields.anotacoes_caso, "uuid"]),
      { prefix: "AnotacoesCaso" },
    );

    const query = /*sql*/ `
		SELECT 
			${fieldsAnotacoesCaso},
			JSON_OBJECT(${fieldsAdvogado}) AS advogado
		FROM AnotacoesCaso
		JOIN Advogado ON AnotacoesCaso.advogado_uuid = Advogado.uuid
		WHERE AnotacoesCaso.${args.where} = ?;
		`;

    const values = [args.value];
    const result = await this.repository.executeAsArray<T[]>(query, values);

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }
}
