import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  servicoRepositoryColumns,
  ServicoRepositoryDTO,
} from "../../../domain/repositories/servico.repository-abstract.js";
import { servicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { ServicoType } from "../../types/servico.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ServicoOutputResolverDTO,
  servicoOutputResolverDTO,
} from "./servico.resolver-dto.js";

export type FindServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof ServicoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<ServicoOutputResolverDTO>>
>;

const resolve: FindServicoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findServico"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof ServicoRepositoryDTO)[]>(
    extractFields["findServico"],
    {
      allowedFields: servicoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, servicoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await servicoRepository.find({ ...data, fields: fieldsKeys });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return servicoOutputResolverDTO(result.value);
};

export const findServico: GraphQLFieldConfig<any, any, any> = {
  type: ServicoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
