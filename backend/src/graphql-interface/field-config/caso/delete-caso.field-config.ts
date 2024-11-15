import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { casoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";

export type DeleteCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
  },
  Promise<boolean>
>;

const resolve: DeleteCasoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteCaso"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
    })
    .parse(props);

  const result = await casoRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o caso.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteCaso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
