import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  enderecoRepositoryColumns,
  EnderecoRepositoryDTO,
} from "../../../domain/repositories/endereco.repository-abstract.js";
import { enderecoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { EnderecoType } from "../../types/endereco.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  EnderecoOutputResolverDTO,
  enderecoOutputResolverDTO,
} from "./endereco.resolver-dto.js";

export type FindEnderecoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof EnderecoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<EnderecoOutputResolverDTO>>
>;

const resolve: FindEnderecoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findEndereco"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof EnderecoRepositoryDTO)[]>(
    extractFields["findEndereco"],
    {
      allowedFields: enderecoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, enderecoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await enderecoRepository.find({ ...data, fields: fieldsKeys });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return enderecoOutputResolverDTO(result.value);
};

export const findEndereco: GraphQLFieldConfig<any, any, any> = {
  type: EnderecoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
