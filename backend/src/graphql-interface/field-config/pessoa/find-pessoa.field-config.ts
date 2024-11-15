import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  pessoaRepositoryColumns,
  PessoaRepositoryDTO,
} from "../../../domain/repositories/pessoa.repository-abstract.js";
import { pessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { PessoaType } from "../../types/pessoa.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  PessoaOutputResolverDTO,
  pessoaOutputResolverDTO,
} from "./pessoa.resolver-dto.js";

export type FindPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof PessoaRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<PessoaOutputResolverDTO>>
>;

const resolve: FindPessoaType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findPessoa"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof PessoaRepositoryDTO)[]>(
    extractFields["findPessoa"],
    {
      allowedFields: pessoaRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, pessoaRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await pessoaRepository.find({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a pessoa.", {
      errors: [{ message: result.message }],
    });
  }
  return pessoaOutputResolverDTO(result.value);
};

export const findPessoa: GraphQLFieldConfig<any, any, any> = {
  type: PessoaType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
