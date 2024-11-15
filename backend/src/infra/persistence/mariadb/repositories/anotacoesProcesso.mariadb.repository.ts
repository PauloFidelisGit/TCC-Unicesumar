import { AdvogadoRepositoryDTO } from "../../../../domain/repositories/advogado.repository-abstract.js";
import {
  AnotacoesProcessoRepositoryAbstract,
  AnotacoesProcessoRepositoryDTO,
} from "../../../../domain/repositories/anotacoes-processo.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import {
  DefaultQueryBuilder,
  formatSelectFields,
  parseSetFields,
} from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class AnotacoesProcessoMariaDB extends AnotacoesProcessoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<AnotacoesProcessoRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "AnotacoesProcesso",
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

  async update(
    args: GetFirstParam<AnotacoesProcessoRepositoryAbstract["update"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.update(
      "AnotacoesProcesso",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<AnotacoesProcessoRepositoryDTO>>(
    args: GetFirstParam<AnotacoesProcessoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find(
      "AnotacoesProcesso",
      args,
    );
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<AnotacoesProcessoRepositoryDTO>>(
    args: GetFirstParam<AnotacoesProcessoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list(
      "AnotacoesProcesso",
      args,
    );
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<AnotacoesProcessoRepositoryDTO>>(
    args: GetFirstParam<AnotacoesProcessoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search(
      "AnotacoesProcesso",
      args,
    );
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(
    args: GetFirstParam<AnotacoesProcessoRepositoryAbstract["delete"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.delete(
      "AnotacoesProcesso",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("AnotacoesProcesso");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }

  async findAnotacoesProcessoAndAllRelation<
    T extends Partial<AdvogadoRepositoryDTO>,
  >(
    args: GetFirstParam<
      AnotacoesProcessoRepositoryAbstract["findAnotacoesProcessoAndAllRelation"]
    >,
  ) {
    const fieldsAdvogado = formatSelectFields(
      parseSetFields([...args.fields.advogado, "uuid"]),
      {
        prefix: "Advogado",
        toJsonObject: true,
      },
    );

    const fieldsAnotacoesProcesso = formatSelectFields(
      parseSetFields([...args.fields.anotacoes_processo, "uuid"]),
      { prefix: "AnotacoesProcesso" },
    );

    const query = /*sql*/ `
		SELECT 
			${fieldsAnotacoesProcesso},
			JSON_OBJECT(${fieldsAdvogado}) AS advogado
		FROM AnotacoesProcesso
		JOIN Advogado ON AnotacoesProcesso.advogado_uuid = Advogado.uuid
		WHERE AnotacoesProcesso.${args.where} = ?;
		`;

    const values = [args.value];
    const result = await this.repository.executeAsArray<T[]>(query, values);

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }
}
