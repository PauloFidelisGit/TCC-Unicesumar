import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  casoRepositoryColumns,
  CasoRepositoryDTO,
} from "../../../domain/repositories/caso.repository-abstract.js";
import { casoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { CasoType } from "../../types/caso.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  CasoOutputResolverDTO,
  casoOutputResolverDTO,
} from "./caso.resolver-dto.js";

export type ListCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<CasoOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListCasoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listCaso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof CasoRepositoryDTO)[]>(
    extractFields?.["listCaso"]?.["data"],
    {
      allowedFields: casoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await casoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar os casos.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(casoOutputResolverDTO);

  const count = props.count
    ? await casoRepository.count().then((v) => {
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

export const listCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListCaso",
    fields: {
      data: { type: new GraphQLList(CasoType) },
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
