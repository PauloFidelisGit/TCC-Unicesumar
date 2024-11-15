import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLInt } from "graphql";
import { pessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";

export type CountPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  unknown,
  Promise<number>
>;

const resolve: CountPessoaType = async (_parent, _props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["countPessoa"]))
    .executeRules();
  const result = await pessoaRepository.count().then((v) => {
    if (!v.success)
      throw new ResolverError("Não foi possível contar os registros.");
    return v.value;
  });

  return result;
};

export const countPessoa: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLInt,
  resolve,
};
