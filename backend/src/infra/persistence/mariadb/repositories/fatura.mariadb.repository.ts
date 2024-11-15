import { UpsertResult } from "mariadb";
import { STATUS_FATURA } from "../../../../domain/enums/STATUS_FATURA.js";
import { DatabaseError } from "../../../../domain/errors/database.error.js";
import {
  FaturaRepositoryAbstract,
  FaturaRepositoryDTO,
  PickFaturaRepositoryDTO,
} from "../../../../domain/repositories/fatura.repository-abstract.js";
import { PickOrdemServicoRepositoryDTO } from "../../../../domain/repositories/ordem-servico.repository-abstract.js";
import { Datetime } from "../../../../domain/vo/datetime.vo.js";
import { PickParcelaFaturaOutputResolverDTO } from "../../../../graphql-interface/field-config/fatura/parcela-fatura.resolver.dto.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class FaturaMariaDB extends FaturaRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async createFatura(
    args: GetFirstParam<FaturaRepositoryAbstract["createFatura"]>,
  ) {
    const result = await this.repository.executeTransaction({
      createFatura: async (conn) => {
        const { query, values } = DefaultQueryBuilder.insertInto(
          "Fatura",
          args.fatura,
        );
        const result = await conn.execute<{ uuid: string }[]>(query, values);
        if (!result[0]) {
          new DatabaseError("Houve um erro ao criar a fatura.");
        }
        return result[0]!;
      },
      createParcelasFatura: async (conn) => {
        const { query, values } = DefaultQueryBuilder.insertBulkInto(
          "ParcelaFatura",
          args.parcelas,
        );
        const result = await conn.batch<{ uuid: string }[]>(query, values);
        return result;
      },
      updateOrdemServico: async (conn) => {
        const update = DefaultQueryBuilder.bulkUpdate(
          "OrdemServico",
          args.ordens_servico,
        );
        return await Promise.all(
          update.map(async (v) => {
            const result = await conn.execute<UpsertResult>(v.query, v.values);
            if (result.affectedRows === 0) {
              throw new DatabaseError(
                "Houve um erro ao atualizar a ordem de serviço.",
              );
            }
            return true;
          }),
        );
      },
    });

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async updateFatura(args: {
    fatura: {
      uuid: string;
      data: PickFaturaRepositoryDTO<{
        atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
        valor_total: number;
        data_emissao: Datetime<string>["toDatabaseTimeStamp"];
        observacoes?: string | null;
        status_fatura?: STATUS_FATURA;
      }>;
    };
    parcelas: PickParcelaFaturaOutputResolverDTO<{
      uuid: string;
      criado_em: Datetime<string>["toDatabaseTimeStamp"];
      fatura_uuid: string;
      numero: number;
      valor: number;
      data_vencimento: Datetime<string>["toDate"];
      data_pagamento?: Datetime<string | null>["toDate"];
    }>[];
    ordens_servico: {
      uuid: string;
      data: PickOrdemServicoRepositoryDTO<{
        atualizado_em: Datetime<string>["toDatabaseTimeStamp"];
      }>;
    }[];
  }) {
    const result = await this.repository.executeTransaction({
      updateFatura: async (conn) => {
        const { query, values } = DefaultQueryBuilder.update(
          "Fatura",
          args.fatura,
        );
        const result = await conn.execute<UpsertResult>(query, values ?? []);

        if (result.affectedRows === 0) {
          return {
            success: false as const,
            message: "Não foi possível executar a operação.",
          };
        }

        return true;
      },
      createParcelasFatura: async (conn) => {
        {
          const queryDeleteallParcelas = /*sql*/ `
					DELETE FROM ParcelaFatura
					WHERE fatura_uuid = ?`;
          const values = [args.fatura.uuid];
          const result = await conn.execute<UpsertResult>(
            queryDeleteallParcelas,
            values ?? [],
          );

          if (result.affectedRows === 0) {
            return {
              success: false as const,
              message: "Não foi possível excluir as parcelas da fatura.",
            };
          }
        }

        const { query, values } = DefaultQueryBuilder.insertBulkInto(
          "ParcelaFatura",
          args.parcelas,
        );

        const result = await conn.batch<{ uuid: string }[]>(query, values);

        return result;
      },
      updateOrdemServico: async (conn) => {
        const queryNullableAllRelation = /*sql*/ `
				UPDATE OrdemServico
				SET fatura_uuid = NULL
				WHERE fatura_uuid = ?;`;
        const values = [args.fatura.uuid];
        await conn.execute(queryNullableAllRelation, values);

        const update = DefaultQueryBuilder.bulkUpdate(
          "OrdemServico",
          args.ordens_servico,
        );

        return await Promise.all(
          update.map(async (v) => {
            const result = await conn.execute<UpsertResult>(v.query, v.values);
            if (result.affectedRows === 0) {
              throw new DatabaseError(
                "Houve um erro ao atualizar a ordem de serviço.",
              );
            }
            return true;
          }),
        );
      },
    });

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async update(args: GetFirstParam<FaturaRepositoryAbstract["update"]>) {
    const { query, values } = DefaultQueryBuilder.update("Fatura", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async find<R extends Partial<FaturaRepositoryDTO>>(
    args: GetFirstParam<FaturaRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Fatura", args);
    const result = await this.repository.getFirst<R>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async list<R extends Partial<FaturaRepositoryDTO>>(
    args: GetFirstParam<FaturaRepositoryAbstract["list"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.list("Fatura", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async search<R extends Partial<FaturaRepositoryDTO>>(
    args: GetFirstParam<FaturaRepositoryAbstract["search"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.search("Fatura", args);
    const result = await this.repository.executeAsArray<R[]>(query, values);
    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(args: GetFirstParam<FaturaRepositoryAbstract["delete"]>) {
    const { query, values } = DefaultQueryBuilder.delete("Fatura", args);
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("Fatura");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
