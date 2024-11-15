import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  pessoaRepositoryColumns,
  PessoaRepositoryDTO,
} from "../../../domain/repositories/pessoa.repository-abstract.js";
import { pessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { PessoaType } from "../../types/pessoa.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  PessoaOutputResolverDTO,
  pessoaOutputResolverDTO,
} from "./pessoa.resolver-dto.js";

export type ListPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<PessoaOutputResolverDTO>[];
    nextCursor: number | null;
  }>
>;

const resolve: ListPessoaType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listPessoa"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof PessoaRepositoryDTO)[]>(
    extractFields["listPessoa"].data,
    {
      allowedFields: pessoaRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await pessoaRepository.list({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível listar as pessoas.", {
      errors: [{ message: result.message }],
    });
  }
  const mappedData = result.value.map(pessoaOutputResolverDTO);

  const count = props.count
    ? await pessoaRepository.count().then((v) => {
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

export const listPessoa: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListPessoa",
    fields: {
      data: { type: new GraphQLList(PessoaType) },
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
