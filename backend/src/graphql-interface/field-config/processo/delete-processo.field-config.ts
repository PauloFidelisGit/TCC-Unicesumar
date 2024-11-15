import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickProcessoInputResolverDTO } from "./processo.resolver-dto.js";

export type DeleteProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickProcessoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteProcessoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteProcesso"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await processoRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o processo.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteProcesso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
