import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  anotacoesCasoRepositoryColumns,
  AnotacoesCasoRepositoryDTO,
} from "../../../domain/repositories/anotacoes-caso.repository-abstract.js";
import { anotacoesCasoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { AnotacoesCasoType } from "../../types/anotacoes-caso.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AnotacoesCasoOutputResolverDTO,
  anotacoesCasoOutputResolverDTO,
} from "./anotacoes-caso.resolver-dto.js";

export type ListAnotacoesCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<AnotacoesCasoOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListAnotacoesCasoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listAnotacoesCaso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof AnotacoesCasoRepositoryDTO)[]>(
    extractFields?.["listAnotacoesCaso"]?.["data"],
    {
      allowedFields: anotacoesCasoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await anotacoesCasoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar as anotações.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(anotacoesCasoOutputResolverDTO);

  const count = props.count
    ? await anotacoesCasoRepository.count().then((v) => {
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

export const listAnotacoesCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListAnotacoesCaso",
    fields: {
      data: { type: new GraphQLList(AnotacoesCasoType) },
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
