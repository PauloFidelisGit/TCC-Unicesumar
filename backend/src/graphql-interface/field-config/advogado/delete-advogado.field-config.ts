import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickAdvogadoInputResolverDTO } from "./advogado.resolver-dto.js";

export type DeleteAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAdvogadoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteAdvogadoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteAdvogado"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await advogadoRepository.delete(data);

  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o advogado.", {
      errors: [{ message: result.message }],
    });
  }

  return true;
};

export const deleteAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
