import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  servicoRepositoryColumns,
  ServicoRepositoryDTO,
} from "../../../domain/repositories/servico.repository-abstract.js";
import { servicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { ServicoType } from "../../types/servico.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ServicoOutputResolverDTO,
  servicoOutputResolverDTO,
} from "./servico.resolver-dto.js";

export type SearchServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof ServicoRepositoryDTO;
  },
  Promise<Partial<ServicoOutputResolverDTO>[]>
>;

const resolve: SearchServicoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchServico"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof ServicoRepositoryDTO)[]>(
    extractFields["searchServico"],
    {
      allowedFields: servicoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, servicoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await servicoRepository.search({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(servicoOutputResolverDTO);
};

export const searchServico: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(ServicoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
