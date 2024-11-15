import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  municipioRepositoryColumns,
  MunicipioRepositoryDTO,
} from "../../../domain/repositories/municipio.repository-abstract.js";
import { municipioRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { MunicipioType } from "../../types/municipio.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  MunicipioOutputResolverDTO,
  municipioOutputResolverDTO,
} from "./municipio.resolver.dto.js";

export type FindMunicipioType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof MunicipioRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<MunicipioOutputResolverDTO>>
>;

const resolve: FindMunicipioType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findMunicipio"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof MunicipioRepositoryDTO)[]>(
    extractFields["findMunicipio"],
    {
      allowedFields: municipioRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, municipioRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await municipioRepository.find({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar o municipio.", {
      errors: [{ message: result.message }],
    });
  }
  return municipioOutputResolverDTO(result.value);
};

export const findMunicipio: GraphQLFieldConfig<any, any, any> = {
  type: MunicipioType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
