import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  ordemServicoRepositoryColumns,
  OrdemServicoRepositoryDTO,
} from "../../../domain/repositories/ordem-servico.repository-abstract.js";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { OrdemServicoType } from "../../types/ordem-servico.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  OrdemServicoOutputResolverDTO,
  ordemServicoOutputResolverDTO,
} from "./ordem-servico.resolver-dto.js";

export type FindOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof OrdemServicoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<OrdemServicoOutputResolverDTO>>
>;

const resolve: FindOrdemServicoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findOrdemServico"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof OrdemServicoRepositoryDTO)[]>(
    extractFields["findOrdemServico"],
    {
      allowedFields: ordemServicoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, ordemServicoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await ordemServicoRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return ordemServicoOutputResolverDTO(result.value);
};

export const findOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: OrdemServicoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
