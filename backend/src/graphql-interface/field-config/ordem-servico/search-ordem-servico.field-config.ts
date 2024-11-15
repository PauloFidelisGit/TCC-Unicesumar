import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  ordemServicoRepositoryColumns,
  OrdemServicoRepositoryDTO,
} from "../../../domain/repositories/ordem-servico.repository-abstract.js";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt, NonNullString } from "../../types/aliases.js";
import { OrdemServicoType } from "../../types/ordem-servico.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  OrdemServicoOutputResolverDTO,
  ordemServicoOutputResolverDTO,
} from "./ordem-servico.resolver-dto.js";

export type SearchOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof OrdemServicoRepositoryDTO;
    without_fatura?: boolean;
  },
  Promise<OrdemServicoOutputResolverDTO[]>
>;

const resolve: SearchOrdemServicoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchOrdemServico"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof OrdemServicoRepositoryDTO)[]>(
    extractFields["searchOrdemServico"],
    {
      allowedFields: ordemServicoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, ordemServicoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
      without_fatura: x.boolean({ label: "without_fatura" }).optional(),
    })
    .parse(props);

  const result = props.without_fatura
    ? await ordemServicoRepository.searchOrdemServicoForCreateFatura({
        ...data,
        fields: fieldsKeys,
      })
    : await ordemServicoRepository.search({
        ...data,
        fields: fieldsKeys,
      });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(ordemServicoOutputResolverDTO);
};

export const searchOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(OrdemServicoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
    without_fatura: Boolean,
  },
  resolve,
};
