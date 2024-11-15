import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLInt } from "graphql";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";

export type CountOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  any,
  Promise<number>
>;

const resolve: CountOrdemServicoType = async (
  _parent,
  _props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["countProcesso"]))
    .executeRules();
  const result = await ordemServicoRepository.count();
  if (!result.success) {
    throw new ResolverError("Não foi possível contar os registros.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value;
};

export const countOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLInt,
  resolve,
};
