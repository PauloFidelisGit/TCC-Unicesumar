import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  advogadoRepositoryColumns,
  AdvogadoRepositoryDTO,
} from "../../../domain/repositories/advogado.repository-abstract.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { AdvogadoType } from "../../types/advogado.graphql-type.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdvogadoOutputResolverDTO,
  advogadoOutputResolverDTO,
} from "./advogado.resolver-dto.js";

export type ListAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<AdvogadoOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListAdvogadoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listAdvogado"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof AdvogadoRepositoryDTO)[]>(
    extractFields["listAdvogado"]?.["data"],
    {
      allowedFields: advogadoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await advogadoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar os advogados.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(advogadoOutputResolverDTO);

  const count = props.count
    ? await advogadoRepository.count().then((v) => {
        if (!v.success) throw new ResolverError("Não foi possível.");
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

export const listAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListAdvogado",
    fields: {
      data: { type: new GraphQLList(AdvogadoType) },
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
