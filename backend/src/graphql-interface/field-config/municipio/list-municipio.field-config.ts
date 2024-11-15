import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  municipioRepositoryColumns,
  MunicipioRepositoryDTO,
} from "../../../domain/repositories/municipio.repository-abstract.js";
import { municipioRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
import { MunicipioType } from "../../types/municipio.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  MunicipioOutputResolverDTO,
  municipioOutputResolverDTO,
} from "./municipio.resolver.dto.js";

export type ListMunicipioType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    data: Partial<MunicipioOutputResolverDTO>[];
    nextCursor: number | null;
    count: number | null;
  }>
>;

const resolve: ListMunicipioType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listMunicipio"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof MunicipioRepositoryDTO)[]>(
    extractFields["listMunicipio"].data,
    {
      allowedFields: municipioRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await municipioRepository.list({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível listar os municipios.", {
      errors: [{ message: result.message }],
    });
  }
  const mappedData = result.value.map(municipioOutputResolverDTO);
  const count = props.count
    ? await municipioRepository.count().then((v) => {
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

export const listMunicipio: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListMunicipio",
    fields: {
      data: { type: new GraphQLList(MunicipioType) },
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
