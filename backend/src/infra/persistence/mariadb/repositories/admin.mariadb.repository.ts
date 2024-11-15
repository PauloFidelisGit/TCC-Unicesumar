import {
  AdminRepositoryAbstract,
  AdminRepositoryDTO,
} from "../../../../domain/repositories/admin.repository-abstract.js";
import { GetFirstParam } from "../types/index.js";
import { DefaultQueryBuilder } from "./helpers.js";
import { MariaDb } from "./mariaDb.js";

export class AdminMariaDB extends AdminRepositoryAbstract {
  constructor(readonly repository: MariaDb) {
    super();
  }

  async save(args: GetFirstParam<AdminRepositoryAbstract["save"]>) {
    const { query, values } = DefaultQueryBuilder.insertInto("Admin", args);
    const result = await this.repository.getFirst<{ uuid: string }>(
      query,
      values,
    );
    return result.success
      ? { success: true as const, value: { uuid: result.value.uuid } }
      : result;
  }

  async find<R extends Partial<AdminRepositoryDTO>>(
    args: GetFirstParam<AdminRepositoryAbstract["find"]>,
  ) {
    const { query, values } = DefaultQueryBuilder.find("Admin", args);
    const result = await this.repository.getFirst<R>(query, values);

    return result.success
      ? { success: true as const, value: result.value }
      : result;
  }
}
