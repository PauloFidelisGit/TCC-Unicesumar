import { DatabaseError } from "../../../../domain/errors/database.error.js";
import {
  AdvogadoRepositoryAbstract,
  AdvogadoRepositoryDTO,
} from "../../../../domain/repositories/advogado.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class AdvogadoMariaDB extends AdvogadoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<AdvogadoRepositoryAbstract["save"]>) {
    const result = await this.repository.executeTransaction({
      createAdvogado: async (conn) => {
        const { query, values } = DefaultQueryBuilder.insertInto(
          "Advogado",
          args.advogado,
        );
        const result = await conn.execute<{ uuid: string }[]>(query, values);
        if (!result[0]) {
          new DatabaseError("Houve um erro ao criar ao advogado.");
        }
        return result[0]!;
      },
      createRelacionamentoPermissaoAdvogado: async (conn) => {
        const { query, values } = DefaultQueryBuilder.insertBulkInto(
          "RelacionamentoPermissaoAdvogado",
          args.permissoes,
        );
        await conn.batch<true>(query, values);
        return true;
      },
    });
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async update(args: GetFirstParam<AdvogadoRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Advogado", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<AdvogadoRepositoryDTO>>(
    args: GetFirstParam<AdvogadoRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Advogado", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<AdvogadoRepositoryDTO>>(
    args: GetFirstParam<AdvogadoRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Advogado", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<AdvogadoRepositoryDTO>>(
    args: GetFirstParam<AdvogadoRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Advogado", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<AdvogadoRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Advogado", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Advogado");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }

  async findAllPermissionsByUuid(
    args: GetFirstParam<AdvogadoRepositoryAbstract["findAllPermissionsByUuid"]>,
  ) {
    const query = /*sql*/ `SELECT pa.nome
		FROM RelacionamentoPermissaoAdvogado rpa
		JOIN PermissaoAdvogado pa ON rpa.permissao_advogado_uuid = pa.uuid
		JOIN Advogado a ON rpa.advogado_uuid = a.uuid
		WHERE a.uuid = ?;
		`;
    const values = [args.uuid];
    const result = await this.repository.executeAsArray<{ nome: string }[]>(
      query,
      values,
    );

    if (!result.success) {
      return result;
    }

    const newResult = result.value.map((item) => item.nome);

    return { success: true as const, value: newResult };
  }

  async hasPermission(
    args: GetFirstParam<AdvogadoRepositoryAbstract["hasPermission"]>,
  ) {
    const query = /*sql*/ `SELECT pa.nome
		FROM RelacionamentoPermissaoAdvogado rpa
		JOIN PermissaoAdvogado pa ON rpa.permissao_advogado_uuid = pa.uuid
		JOIN Advogado a ON rpa.advogado_uuid = a.uuid
		WHERE a.uuid = ? AND pa.nome = ?;
		`;

    const values = [args.advogado_uuid, args.permission_name];

    const result = await this.repository.getFirst<{ nome: string }>(
      query,
      values,
    );

    if (!result.success) {
      return result;
    }

    const hasPermission = result.value.nome === args.permission_name;

    return result.success
      ? { success: true as const, value: hasPermission }
      : result;
  }
}
