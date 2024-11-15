import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  faturaRepositoryColumns,
  FaturaRepositoryDTO,
} from "../../../domain/repositories/fatura.repository-abstract.js";
import { faturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { FaturaType } from "../../types/fatura.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  faturaOutputResolverDTO,
  FaturaOutputResolverDTO,
} from "./fatura.resolver-dto.js";

export type FindFaturaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof FaturaRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<FaturaOutputResolverDTO>>
>;

const resolve: FindFaturaType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findFatura"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof FaturaRepositoryDTO)[]>(
    extractFields["findFatura"],
    {
      allowedFields: faturaRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, faturaRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await faturaRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a fatura.", {
      errors: [{ message: result.message }],
    });
  }

  return faturaOutputResolverDTO(result.value);
};

export const findFatura: GraphQLFieldConfig<any, any, any> = {
  type: FaturaType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
