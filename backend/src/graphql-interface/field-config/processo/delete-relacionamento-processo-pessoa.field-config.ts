import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { relacionamentoProcessoPessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickRelacionamentoProcessoPessoaInputResolverDTO } from "./relacionamento-processo-pessoa.resolver-dto.js";

export type DeleteRelacionamentoProcessoPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickRelacionamentoProcessoPessoaInputResolverDTO<{
    uuid: string;
  }>,
  Promise<boolean>
>;

const resolve: DeleteRelacionamentoProcessoPessoaType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["deleteRelacionamentoProcesso"]))
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await relacionamentoProcessoPessoaRepository.delete(data);

  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o relacionamento.", {
      errors: [{ message: result.message }],
    });
  }

  return true;
};

export const deleteRelacionamentoProcessoPessoa: GraphQLFieldConfig<
  any,
  any,
  any
> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
  },
  resolve,
};
