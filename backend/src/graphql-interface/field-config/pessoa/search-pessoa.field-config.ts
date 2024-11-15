import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  pessoaRepositoryColumns,
  PessoaRepositoryDTO,
} from "../../../domain/repositories/pessoa.repository-abstract.js";
import { pessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { PessoaType } from "../../types/pessoa.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  PessoaOutputResolverDTO,
  pessoaOutputResolverDTO,
} from "./pessoa.resolver-dto.js";

export type SearchPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof PessoaRepositoryDTO;
  },
  Promise<Partial<PessoaOutputResolverDTO>[]>
>;

const resolve: SearchPessoaType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchPessoa"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof PessoaRepositoryDTO)[]>(
    extractFields["searchPessoa"],
    {
      allowedFields: pessoaRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, pessoaRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await pessoaRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar as pessoas.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(pessoaOutputResolverDTO);
};

export const searchPessoa: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(PessoaType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
