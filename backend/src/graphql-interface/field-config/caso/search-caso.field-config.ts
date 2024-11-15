import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  casoRepositoryColumns,
  CasoRepositoryDTO,
} from "../../../domain/repositories/caso.repository-abstract.js";
import { casoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { CasoType } from "../../types/caso.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  CasoOutputResolverDTO,
  casoOutputResolverDTO,
} from "./caso.resolver-dto.js";

export type SearchCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof CasoRepositoryDTO;
  },
  Promise<Partial<CasoOutputResolverDTO>[]>
>;

const resolve: SearchCasoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchCaso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof CasoRepositoryDTO)[]>(
    extractFields["searchCaso"],
    {
      allowedFields: casoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, casoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await casoRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar os casos.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(casoOutputResolverDTO);
};

export const searchCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(CasoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
