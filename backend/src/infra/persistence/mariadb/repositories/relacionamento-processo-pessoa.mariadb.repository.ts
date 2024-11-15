import { PessoaRepositoryDTO } from "../../../../domain/repositories/pessoa.repository-abstract.js";
import {
  RelacionamentoProcessoPessoaRepositoryAbstract,
  RelacionamentoProcessoPessoaRepositoryDTO,
} from "../../../../domain/repositories/relacionamento-processo-pessoa.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import {
  DefaultQueryBuilder,
  formatSelectFields,
  parseSetFields,
} from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class RelacionamentoProcessoPessoaMariaDB extends RelacionamentoProcessoPessoaRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  /**
   * A restrição de duplicidade está implementada no código mysql.
   */
  async save(
    args: GetFirstParam<RelacionamentoProcessoPessoaRepositoryAbstract["save"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.insertInto(
      "RelacionamentoProcessoPessoa",
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

  update(): any {
    throw new Error("Method not implemented.");
  }

  async delete(
    args: GetFirstParam<
      RelacionamentoProcessoPessoaRepositoryAbstract["delete"]
    >,
  ) {
    const { query, values } = DefaultQueryBuilder.delete(
      "RelacionamentoProcessoPessoa",
      args,
    );
    const result = await this.repository.executeResult(query, values);
    return result.success
      ? { success: true as const, value: true as const }
      : result;
  }

  async count() {
    const { query } = DefaultQueryBuilder.count("RelacionamentoProcessoPessoa");
    const result = await this.repository.getFirst<{ count: number }>(query);
    return result.success
      ? { success: true as const, value: Number(result.value.count) }
      : result;
  }

  async findPessoasRelatedProcesso<
    T extends Partial<
      RelacionamentoProcessoPessoaRepositoryDTO & {
        pessoa: PessoaRepositoryDTO;
      }
    >,
  >(
    args: GetFirstParam<
      RelacionamentoProcessoPessoaRepositoryAbstract["findPessoasRelatedProcesso"]
    >,
  ) {
    let fieldsPessoa = formatSelectFields(
      parseSetFields([...args.fields.pessoa, "uuid"]),
      {
        prefix: "Pessoa",
        toJsonObject: true,
      },
    );

    const fieldsRelacionamentoProcessoPessoa = formatSelectFields(
      parseSetFields([
        ...args.fields.relacionamento_processo,
        "tipo_relacionamento",
        "uuid",
      ]),
      { prefix: "RelacionamentoProcessoPessoa" },
    );

    const query = /*sql*/ `
		SELECT 
			${fieldsRelacionamentoProcessoPessoa},
			JSON_OBJECT(${fieldsPessoa}) AS pessoa
		FROM RelacionamentoProcessoPessoa
		JOIN Pessoa ON RelacionamentoProcessoPessoa.pessoa_uuid = Pessoa.uuid
		WHERE RelacionamentoProcessoPessoa.${args.where} = ?;
		`;

    const values = [args.value];
    let result = await this.repository.executeAsArray<T[]>(query, values);

    if (result.success) {
      result.value = result.value.map((item) => {
        if ("pessoa" in item) {
          item.pessoa = JSON.parse(item.pessoa as unknown as string);
        }
        return item;
      });
    }

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }
}
