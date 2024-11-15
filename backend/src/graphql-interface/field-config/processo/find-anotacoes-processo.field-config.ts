import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  anotacoesProcessoRepositoryColumns,
  AnotacoesProcessoRepositoryDTO,
} from "../../../domain/repositories/anotacoes-processo.repository-abstract.js";
import { anotacoesProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { AnotacoesProcessoType } from "../../types/anotacoes-processo.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AnotacoesProcessoOutputResolverDTO,
  anotacoesProcessoOutputResolverDTO,
} from "./anotacoes-processo.resolver-dto.js";

export type FindAnotacoesProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof AnotacoesProcessoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<AnotacoesProcessoOutputResolverDTO>>
>;

const resolve: FindAnotacoesProcessoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findAnotacoesProcesso"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<
    (keyof AnotacoesProcessoRepositoryDTO)[]
  >(extractFields["findAnotacoesProcesso"], {
    allowedFields: anotacoesProcessoRepositoryColumns,
  });

  const data = z
    .object({
      where: x.enum({ label: "where" }, anotacoesProcessoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await anotacoesProcessoRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a anotação.", {
      errors: [{ message: result.message }],
    });
  }

  return anotacoesProcessoOutputResolverDTO(result.value);
};

export const findAnotacoesProcesso: GraphQLFieldConfig<any, any, any> = {
  type: AnotacoesProcessoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
