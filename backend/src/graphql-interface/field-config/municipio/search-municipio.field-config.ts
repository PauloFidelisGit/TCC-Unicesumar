import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  municipioRepositoryColumns,
  MunicipioRepositoryDTO,
} from "../../../domain/repositories/municipio.repository-abstract.js";
import { municipioRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { MunicipioType } from "../../types/municipio.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  MunicipioOutputResolverDTO,
  municipioOutputResolverDTO,
} from "./municipio.resolver.dto.js";

export type SearchMunicipioType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof MunicipioRepositoryDTO;
  },
  Promise<Partial<MunicipioOutputResolverDTO>[]>
>;

const resolve: SearchMunicipioType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchMunicipio"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof MunicipioRepositoryDTO)[]>(
    extractFields["searchMunicipio"],
    {
      allowedFields: municipioRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, municipioRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await municipioRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar os municipios.", {
      errors: [{ message: result.message }],
    });
  }
  return result.value.map(municipioOutputResolverDTO);
};

export const searchMunicipio: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(MunicipioType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
