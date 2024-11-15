import { ProcessoRepositoryDTO } from "../../../../domain/repositories/processo.repository-abstract.js";
import {
  RelacionamentoCasoProcessoRepositoryAbstract,
  RelacionamentoCasoProcessoRepositoryDTO,
} from "../../../../domain/repositories/relacionamento-caso-processo.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import {
  DefaultQueryBuilder,
  formatSelectFields,
  parseSetFields,
} from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class RelacionamentoCasoProcessoMariaDB extends RelacionamentoCasoProcessoRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(
    args: GetFirstParam<RelacionamentoCasoProcessoRepositoryAbstract["save"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "RelacionamentoCasoProcesso",
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

  async findProcessosRelatedCaso<
    T extends (Partial<RelacionamentoCasoProcessoRepositoryDTO> & {
      processo?: Partial<ProcessoRepositoryDTO>;
    })[],
  >(
    args: GetFirstParam<
      RelacionamentoCasoProcessoRepositoryAbstract["findProcessosRelatedCaso"]
    >,
  ) {
    const fieldsProcesso = formatSelectFields(
      parseSetFields([...args.fields.processo, "uuid"]),
      {
        prefix: "Processo",
        toJsonObject: true,
      },
    );

    const fieldsRelacionamentoCasoProcesso = formatSelectFields(
      parseSetFields([...args.fields.relacionamento_caso_processo, "uuid"]),
      { prefix: "RelacionamentoCasoProcesso" },
    );

    const query = /*sql*/ `
    SELECT 
        ${fieldsRelacionamentoCasoProcesso},
        JSON_OBJECT(${fieldsProcesso}) AS processo
    FROM RelacionamentoCasoProcesso
    JOIN Processo ON RelacionamentoCasoProcesso.processo_uuid = Processo.uuid
    WHERE RelacionamentoCasoProcesso.caso_uuid = ?
		GROUP BY Processo.uuid
		`;

    const values = [args.caso_uuid];
    let result = await this.repository.executeAsArray<T>(query, values);

    if (result.success) {
      result.value = result.value.map((item) => {
        if (item.processo) {
          item.processo = JSON.parse(item.processo as string);
        }
        return item;
      }) as T;
    }

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }

  async delete(
    args: GetFirstParam<RelacionamentoCasoProcessoRepositoryAbstract["delete"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.delete(
      "RelacionamentoCasoProcesso",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("RelacionamentoCasoProcesso");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }
}
