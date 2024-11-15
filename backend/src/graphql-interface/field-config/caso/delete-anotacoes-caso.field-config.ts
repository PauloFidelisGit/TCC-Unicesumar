import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { anotacoesCasoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickAnotacoesCasoInputResolverDTO } from "./anotacoes-caso.resolver-dto.js";

export type DeleteAnotacoesCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAnotacoesCasoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteAnotacoesCasoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteAnotacoesCaso"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uiid" }) }).parse(props);

  const result = await anotacoesCasoRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir a anotação.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteAnotacoesCaso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
