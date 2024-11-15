import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLInt } from "graphql";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";

export type CountProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  unknown,
  Promise<number>
>;

const resolve: CountProcessoType = async (_parent, _props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["countProcesso"]))
    .executeRules();

  const result = await processoRepository.count();

  if (!result.success) {
    throw new ResolverError("Não foi possível contar os registros.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value;
};

export const countProcesso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLInt,
  resolve,
};
