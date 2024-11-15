import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  orgaoRepositoryColumns,
  OrgaoRepositoryDTO,
} from "../../../domain/repositories/orgao.repository-abstract.js";
import { orgaoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { OrgaoType } from "../../types/orgao.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  OrgaoOutputResolverDTO,
  orgaoOutputResolverDTO,
} from "./orgao.resolver-dto.js";

export type SearchOrgaoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof OrgaoRepositoryDTO;
  },
  Promise<Partial<OrgaoOutputResolverDTO>[]>
>;

const resolve: SearchOrgaoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchOrgao"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof OrgaoRepositoryDTO)[]>(
    extractFields["searchOrgao"],
    {
      allowedFields: orgaoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, orgaoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await orgaoRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar os órgãos.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(orgaoOutputResolverDTO);
};

export const searchOrgao: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(OrgaoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
