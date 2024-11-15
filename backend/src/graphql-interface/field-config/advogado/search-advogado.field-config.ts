import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  advogadoRepositoryColumns,
  AdvogadoRepositoryDTO,
} from "../../../domain/repositories/advogado.repository-abstract.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { AdvogadoType } from "../../types/advogado.graphql-type.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdvogadoOutputResolverDTO,
  advogadoOutputResolverDTO,
} from "./advogado.resolver-dto.js";

export type SearchAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof AdvogadoRepositoryDTO;
  },
  Promise<Partial<AdvogadoOutputResolverDTO>[]>
>;

const resolve: SearchAdvogadoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchAdvogado"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof AdvogadoRepositoryDTO)[]>(
    extractFields["searchAdvogado"],
    {
      allowedFields: advogadoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, advogadoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await advogadoRepository.search({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível pespquisar os advogados.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(advogadoOutputResolverDTO);
};

export const searchAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(AdvogadoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
