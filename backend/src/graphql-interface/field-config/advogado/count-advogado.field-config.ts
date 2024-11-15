import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLInt } from "graphql";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";

export type CountAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  unknown,
  Promise<number>
>;

const resolve: CountAdvogadoType = async (_parent, _props, context, _info) => {
  context.policy
    .addRule(({ requiredOne }) => requiredOne(["countAdvogado"]))
    .executeRules();

  const result = await advogadoRepository.count();
  if (!result.success) {
    throw new ResolverError("Não foi possível contar os registros.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value;
};

export const countAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLInt,
  resolve,
};
