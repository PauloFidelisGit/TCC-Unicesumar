import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickClasseJudicialInputResolverDTO } from "./classe-judicial.resolver-dto.js";

export type DeleteClasseJudicialType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickClasseJudicialInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteClasseJudicialType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteClasseJudicial"]))
    .executeRules();
  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);
  const result = await classeJudicialRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir a classe judicial.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteClasseJudicial: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
