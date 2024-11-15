import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  classeJudicialRepositoryColumns,
  ClasseJudicialRepositoryDTO,
} from "../../../domain/repositories/classe-judicial.repository-abstract.js";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { ClasseJudicialType } from "../../types/classe-judicial.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  classeJudicialOutputResolverDTO,
  ClasseJudicialOutputResolverDTO,
} from "./classe-judicial.resolver-dto.js";

export type ListClasseJudicialType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<ClasseJudicialOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListClasseJudicialType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listClasseJudicial"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<
    (keyof ClasseJudicialRepositoryDTO)[]
  >(extractFields["listClasseJudicial"]?.["data"], {
    allowedFields: classeJudicialRepositoryColumns,
  });

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await classeJudicialRepository.list({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível listar as classes judiciais.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(classeJudicialOutputResolverDTO);

  const count = props.count
    ? await classeJudicialRepository.count().then((v) => {
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

export const listClasseJudicial: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListClasseJudicial",
    fields: {
      data: { type: new GraphQLList(ClasseJudicialType) },
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
