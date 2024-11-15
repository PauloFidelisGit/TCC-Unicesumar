import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { relacionamentoCasoPessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickRelacionamentoCasoPessoaInputResolverDTO } from "./relacionamento-caso-pessoa.resolver-dto.js";

export type DeleteRelacionamentoCasoPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickRelacionamentoCasoPessoaInputResolverDTO<{
    uuid: string;
  }>,
  Promise<any>
>;

const resolve: DeleteRelacionamentoCasoPessoaType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) =>
      requiredAll(["deleteRelacionamentoCasoPessoa"]),
    )
    .executeRules();

  const data = z.object({ uuid: x.uuid({ label: "uuid" }) }).parse(props);

  const result = await relacionamentoCasoPessoaRepository.delete(data);
  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o relacionamento.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteRelacionamentoCasoPessoa: GraphQLFieldConfig<any, any, any> =
  {
    type: GraphQLBoolean,
    args: {
      uuid: NonNullString,
    },
    resolve,
  };
