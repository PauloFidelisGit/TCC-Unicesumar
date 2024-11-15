import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  enderecoRepositoryColumns,
  EnderecoRepositoryDTO,
} from "../../../domain/repositories/endereco.repository-abstract.js";
import { enderecoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { EnderecoType } from "../../types/endereco.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  EnderecoOutputResolverDTO,
  enderecoOutputResolverDTO,
} from "./endereco.resolver-dto.js";

export type ListEnderecoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<EnderecoOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListEnderecoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listEndereco"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof EnderecoRepositoryDTO)[]>(
    extractFields["listEndereco"].data,
    {
      allowedFields: enderecoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await enderecoRepository.list({ ...data, fields: fieldsKeys });
  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }
  const mappedData = result.value.map(enderecoOutputResolverDTO);
  const count = props.count
    ? await enderecoRepository.count().then((v) => {
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

export const listEndereco: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListEndereco",
    fields: {
      data: { type: new GraphQLList(EnderecoType) },
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
