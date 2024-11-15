import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  anotacoesCasoRepositoryColumns,
  AnotacoesCasoRepositoryDTO,
} from "../../../domain/repositories/anotacoes-caso.repository-abstract.js";
import { anotacoesCasoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { AnotacoesCasoType } from "../../types/anotacoes-caso.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AnotacoesCasoOutputResolverDTO,
  anotacoesCasoOutputResolverDTO,
} from "./anotacoes-caso.resolver-dto.js";

export type FindAnotacoesCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof AnotacoesCasoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<AnotacoesCasoOutputResolverDTO>>
>;

const resolve: FindAnotacoesCasoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findAnotacoesCaso"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof AnotacoesCasoRepositoryDTO)[]>(
    extractFields["findAnotacoesCaso"],
    {
      allowedFields: anotacoesCasoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, anotacoesCasoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await anotacoesCasoRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a anotação.", {
      errors: [{ message: result.message }],
    });
  }

  return anotacoesCasoOutputResolverDTO(result.value);
};

export const findAnotacoesCaso: GraphQLFieldConfig<any, any, any> = {
  type: AnotacoesCasoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
