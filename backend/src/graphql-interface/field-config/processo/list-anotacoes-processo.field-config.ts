import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  anotacoesProcessoRepositoryColumns,
  AnotacoesProcessoRepositoryDTO,
} from "../../../domain/repositories/anotacoes-processo.repository-abstract.js";
import { anotacoesProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { AnotacoesProcessoType } from "../../types/anotacoes-processo.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AnotacoesProcessoOutputResolverDTO,
  anotacoesProcessoOutputResolverDTO,
} from "./anotacoes-processo.resolver-dto.js";

export type ListAnotacoesProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<AnotacoesProcessoOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListAnotacoesProcessoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listAnotacoesProcesso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<
    (keyof AnotacoesProcessoRepositoryDTO)[]
  >(extractFields?.["listAnotacoesProcesso"]?.["data"], {
    allowedFields: anotacoesProcessoRepositoryColumns,
  });

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await anotacoesProcessoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar as anotações.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(anotacoesProcessoOutputResolverDTO);

  const count = props.count
    ? await anotacoesProcessoRepository.count().then((v) => {
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

export const listAnotacoesProcesso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListAnotacoesProcesso",
    fields: {
      data: { type: new GraphQLList(AnotacoesProcessoType) },
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
