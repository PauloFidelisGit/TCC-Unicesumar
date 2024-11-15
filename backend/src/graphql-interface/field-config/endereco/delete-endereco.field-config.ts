import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { enderecoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickEnderecoInputResolverDTO } from "./endereco.resolver-dto.js";

export type DeleteEnderecoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickEnderecoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteEnderecoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteEndereco"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await enderecoRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteEndereco: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
