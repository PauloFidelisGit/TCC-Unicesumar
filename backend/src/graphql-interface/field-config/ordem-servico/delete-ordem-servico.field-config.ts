import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickOrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

export type DeleteOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickOrdemServicoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<true>
>;

const resolve: DeleteOrdemServicoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteEndereco"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await ordemServicoRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir a ordem de serviço.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
