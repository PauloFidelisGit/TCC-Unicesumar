import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
} from "graphql";
import { z } from "zod";
import { relacionamentoCasoProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { PickRelacionamentoCasoProcessoInputResolverDTO } from "./relacionamento-caso-processo.resolver-dto.js";
import { relacionamentoCasoProcessoSchema } from "./relacionamento-caso-processo.schema.js";

export type DeleteRelacionamentoCasoProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickRelacionamentoCasoProcessoInputResolverDTO<{
    uuid: string;
  }>,
  Promise<any>
>;

const resolve: DeleteRelacionamentoCasoProcessoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) =>
      requiredAll(["deleteRelacionamentoCasoProcesso"]),
    )
    .executeRules();

  const data = z
    .object({ uuid: relacionamentoCasoProcessoSchema.uuid })
    .parse(props);

  const result = await relacionamentoCasoProcessoRepository.delete(data);

  if (!result.success) {
    throw new ResolverError("Não foi possível excluir o relacionamento.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const deleteRelacionamentoCasoProcesso: GraphQLFieldConfig<
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
