import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  casoRepositoryColumns,
  CasoRepositoryDTO,
} from "../../../domain/repositories/caso.repository-abstract.js";
import { casoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { CasoType } from "../../types/caso.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  CasoOutputResolverDTO,
  casoOutputResolverDTO,
} from "./caso.resolver-dto.js";

export type FindCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof CasoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<CasoOutputResolverDTO>>
>;

const resolve: FindCasoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findCaso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof CasoRepositoryDTO)[]>(
    extractFields["findCaso"],
    {
      allowedFields: casoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, casoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await casoRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return casoOutputResolverDTO(result.value);
};

export const findCaso: GraphQLFieldConfig<any, any, any> = {
  type: CasoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
