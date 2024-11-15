import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  orgaoRepositoryColumns,
  OrgaoRepositoryDTO,
} from "../../../domain/repositories/orgao.repository-abstract.js";
import { orgaoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { OrgaoType } from "../../types/orgao.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  OrgaoOutputResolverDTO,
  orgaoOutputResolverDTO,
} from "./orgao.resolver-dto.js";

export type FindOrgaoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof OrgaoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<OrgaoOutputResolverDTO>>
>;

const resolve: FindOrgaoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findOrgao"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof OrgaoRepositoryDTO)[]>(
    extractFields["findOrgao"],
    {
      allowedFields: orgaoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, orgaoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await orgaoRepository.find({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar órgão.", {
      errors: [{ message: result.message }],
    });
  }
  return orgaoOutputResolverDTO(result.value);
};

export const findOrgao: GraphQLFieldConfig<any, any, any> = {
  type: OrgaoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
