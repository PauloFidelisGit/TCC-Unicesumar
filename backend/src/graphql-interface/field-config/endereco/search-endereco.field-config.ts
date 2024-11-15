import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  enderecoRepositoryColumns,
  EnderecoRepositoryDTO,
} from "../../../domain/repositories/endereco.repository-abstract.js";
import { enderecoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { EnderecoType } from "../../types/endereco.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  EnderecoOutputResolverDTO,
  enderecoOutputResolverDTO,
} from "./endereco.resolver-dto.js";

export type SearchEnderecoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof EnderecoRepositoryDTO;
  },
  Promise<Partial<EnderecoOutputResolverDTO>[]>
>;

const resolve: SearchEnderecoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchEndereco"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof EnderecoRepositoryDTO)[]>(
    extractFields["searchEndereco"],
    {
      allowedFields: enderecoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, enderecoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await enderecoRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(enderecoOutputResolverDTO);
};

export const searchEndereco: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(EnderecoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
