import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  parcelaFaturaRepositoryColumns,
  ParcelaFaturaRepositoryDTO,
} from "../../../domain/repositories/parcela-fatura.repository-abstract.js";
import { parcelaFaturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { ParcelaFaturaType } from "../../types/parcela-fatura.graphql-type.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import { parcelaFaturaSchema } from "./parcela-fatura.resolver-schema.js";
import {
  ParcelaFaturaOutputResolverDTO,
  parcelaFaturaOutputResolverDTO,
  PickParcelaFaturaInputResolverDTO,
} from "./parcela-fatura.resolver.dto.js";

export type FindParcelasFaturaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickParcelaFaturaInputResolverDTO<{
    fatura_uuid: string;
  }>,
  Promise<Partial<ParcelaFaturaOutputResolverDTO>[]>
>;

const resolve: FindParcelasFaturaType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findParcelasFatura"]))
    .executeRules();

  const fields = new HandleFields(info);

  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof ParcelaFaturaRepositoryDTO)[]>(
    extractFields["findParcelasFatura"],
    {
      allowedFields: parcelaFaturaRepositoryColumns,
    },
  );

  const data = z
    .object({
      fatura_uuid: parcelaFaturaSchema.fatura_uuid,
    })
    .parse(props);

  const result = await parcelaFaturaRepository.search({
    ...data,
    fields: fieldsKeys,
    limit: 1000,
    where: "fatura_uuid",
    value: data.fatura_uuid,
  });

  if (!result.success) {
    throw new ResolverError(
      "Não foi possível encontrar as parcelas da fatura.",
      {
        errors: [{ message: result.message }],
      },
    );
  }

  return result.value.map(parcelaFaturaOutputResolverDTO);
};

export const findParcelasFatura: GraphQLFieldConfig<any, any, any> = {
  type: ParcelaFaturaType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
