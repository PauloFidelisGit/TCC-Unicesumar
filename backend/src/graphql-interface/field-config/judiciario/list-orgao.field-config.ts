import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  orgaoRepositoryColumns,
  OrgaoRepositoryDTO,
} from "../../../domain/repositories/orgao.repository-abstract.js";
import { orgaoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { OrgaoType } from "../../types/orgao.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  OrgaoOutputResolverDTO,
  orgaoOutputResolverDTO,
} from "./orgao.resolver-dto.js";

export type ListOrgaoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<OrgaoOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListOrgaoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listOrgao"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof OrgaoRepositoryDTO)[]>(
    extractFields["listOrgao"]?.["data"],
    {
      allowedFields: orgaoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await orgaoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar os órgãos.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(orgaoOutputResolverDTO);

  const count = props.count
    ? await orgaoRepository.count().then((v) => {
        if (!v.success)
          throw new ResolverError("Não foi possível contar os registros.");
        return v.value;
      })
    : null;
  const nextCursor = makeListCursor(result.value, data.limit);
  return {
    data: mappedData,
    nextCursor: nextCursor,
    count,
  };
};

export const listOrgao: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListOrgao",
    fields: {
      data: { type: new GraphQLList(OrgaoType) },
      nextCursor: { type: GraphQLInt },
      count: { type: GraphQLInt },
    },
  }),
  args: {
    cursor: NonNullInt,
    limit: NonNullInt,
    count: Boolean,
  },
  resolve,
};
