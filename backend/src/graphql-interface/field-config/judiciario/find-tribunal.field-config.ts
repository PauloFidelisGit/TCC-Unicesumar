import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  tribunalRepositoryColumns,
  TribunalRepositoryDTO,
} from "../../../domain/repositories/tribunal.repository-abstract.js";
import { tribunalRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { TribunalType } from "../../types/tribunal.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  TribunalOutputResolverDTO,
  tribunalOutputResolverDTO,
} from "./tribunal.resolver-dto.js";

export type FindTribunalType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof TribunalRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<TribunalOutputResolverDTO>>
>;

const resolve: FindTribunalType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findTribunal"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof TribunalRepositoryDTO)[]>(
    extractFields["findTribunal"],
    {
      allowedFields: tribunalRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, tribunalRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await tribunalRepository.find({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar o tribunal.", {
      errors: [{ message: result.message }],
    });
  }
  return tribunalOutputResolverDTO(result.value);
};

export const findTribunal: GraphQLFieldConfig<any, any, any> = {
  type: TribunalType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
