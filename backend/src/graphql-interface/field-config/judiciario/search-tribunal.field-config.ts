import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  tribunalRepositoryColumns,
  TribunalRepositoryDTO,
} from "../../../domain/repositories/tribunal.repository-abstract.js";
import { tribunalRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { TribunalType } from "../../types/tribunal.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  TribunalOutputResolverDTO,
  tribunalOutputResolverDTO,
} from "./tribunal.resolver-dto.js";

export type SearchTribunalType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof TribunalRepositoryDTO;
  },
  Promise<Partial<TribunalOutputResolverDTO>[]>
>;

const resolve: SearchTribunalType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchTribunal"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof TribunalRepositoryDTO)[]>(
    extractFields["searchTribunal"],
    {
      allowedFields: tribunalRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, tribunalRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await tribunalRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar os tribunais.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(tribunalOutputResolverDTO);
};

export const searchTribunal: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(TribunalType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
