import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  faturaRepositoryColumns,
  FaturaRepositoryDTO,
} from "../../../domain/repositories/fatura.repository-abstract.js";
import { faturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { FaturaType } from "../../types/fatura.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  faturaOutputResolverDTO,
  FaturaOutputResolverDTO,
} from "./fatura.resolver-dto.js";

export type SearchFaturaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof FaturaRepositoryDTO;
  },
  Promise<Partial<FaturaOutputResolverDTO>[]>
>;

const resolve: SearchFaturaType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchFatura"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof FaturaRepositoryDTO)[]>(
    extractFields["searchFatura"],
    {
      allowedFields: faturaRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, faturaRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await faturaRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar as faturas.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(faturaOutputResolverDTO);
};

export const searchFatura: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(FaturaType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
