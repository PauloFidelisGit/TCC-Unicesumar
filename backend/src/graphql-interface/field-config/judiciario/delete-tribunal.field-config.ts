import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { tribunalRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickTribunalInputResolverDTO } from "./tribunal.resolver-dto.js";

export type DeleteTribunalType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickTribunalInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteTribunalType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteTribunal"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await tribunalRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o tribunal.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteTribunal: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
