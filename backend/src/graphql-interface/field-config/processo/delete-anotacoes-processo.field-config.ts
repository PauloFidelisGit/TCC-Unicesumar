import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { anotacoesProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickAnotacoesProcessoInputResolverDTO } from "./anotacoes-processo.resolver-dto.js";

export type DeleteAnotacoesProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAnotacoesProcessoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteAnotacoesProcessoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteAnotacoesProcesso"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await anotacoesProcessoRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir a anotação.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteAnotacoesProcesso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
