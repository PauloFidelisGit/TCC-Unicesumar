import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
	classeJudicialRepositoryColumns,
	ClasseJudicialRepositoryDTO,
} from "../../../domain/repositories/classe-judicial.repository-abstract.js";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { ClasseJudicialType } from "../../types/classe-judicial.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
	classeJudicialOutputResolverDTO,
	ClasseJudicialOutputResolverDTO,
} from "./classe-judicial.resolver-dto.js";

export type FindClasseJudicialType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof ClasseJudicialRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<ClasseJudicialOutputResolverDTO>>
>;

const resolve: FindClasseJudicialType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findClasseJudicial"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<
    (keyof ClasseJudicialRepositoryDTO)[]
  >(extractFields["findClasseJudicial"], {
    allowedFields: classeJudicialRepositoryColumns,
  });

  const data = z
    .object({
      where: x.enum({ label: "where" }, classeJudicialRepositoryColumns),
      value: x.string({ label: "value", min: 0 }).or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await classeJudicialRepository.find({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a classe judicial.", {
      errors: [{ message: result.message }],
    });
  }
  return classeJudicialOutputResolverDTO(result.value);
};

export const findClasseJudicial: GraphQLFieldConfig<any, any, any> = {
  type: ClasseJudicialType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
