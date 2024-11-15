import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  ordemServicoRepositoryColumns,
  OrdemServicoRepositoryDTO,
} from "../../../domain/repositories/ordem-servico.repository-abstract.js";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { OrdemServicoType } from "../../types/ordem-servico.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ordemServicoOutputResolverDTO,
  OrdemServicoOutputResolverDTO,
} from "./ordem-servico.resolver-dto.js";

export type ListOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<OrdemServicoOutputResolverDTO>[];
    nextCursor: number | null;
  }>
>;

const resolve: ListOrdemServicoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listEndereco"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof OrdemServicoRepositoryDTO)[]>(
    extractFields["listOrdemServico"].data,
    {
      allowedFields: ordemServicoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await ordemServicoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(ordemServicoOutputResolverDTO);

  const count = props.count
    ? await ordemServicoRepository.count().then((v) => {
        if (!v.success)
          throw new ResolverError("Não foi possível contar os registros.");
        return v.value;
      })
    : null;

  const nextCursor = makeListCursor(result.value, data.limit);
  return {
    data: mappedData,
    nextCursor: nextCursor,
    count,
  };
};

export const listOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListOrdemServico",
    fields: {
      data: { type: new GraphQLList(OrdemServicoType) },
      nextCursor: { type: GraphQLInt },
      count: { type: GraphQLInt },
    },
  }),
  args: {
    cursor: NonNullInt,
    limit: NonNullInt,
    count: Boolean,
  },
  resolve,
};
