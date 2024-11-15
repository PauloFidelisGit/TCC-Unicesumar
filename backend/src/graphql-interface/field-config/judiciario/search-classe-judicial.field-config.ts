import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  classeJudicialRepositoryColumns,
  ClasseJudicialRepositoryDTO,
} from "../../../domain/repositories/classe-judicial.repository-abstract.js";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { ClasseJudicialType } from "../../types/classe-judicial.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  classeJudicialOutputResolverDTO,
  ClasseJudicialOutputResolverDTO,
} from "./classe-judicial.resolver-dto.js";

export type SearchClasseJudicialType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof ClasseJudicialRepositoryDTO;
  },
  Promise<Partial<ClasseJudicialOutputResolverDTO>[]>
>;

const resolve: SearchClasseJudicialType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchClasseJudicial"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<
    (keyof ClasseJudicialRepositoryDTO)[]
  >(extractFields["searchClasseJudicial"], {
    allowedFields: classeJudicialRepositoryColumns,
  });

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, classeJudicialRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await classeJudicialRepository.search({
    ...data,
    fields: fieldsKeys,
  });
  if (!result.success) {
    throw new ResolverError(
      "Não foi possível pesquisar as classes judiciais.",
      {
        errors: [{ message: result.message }],
      },
    );
  }
  return result.value.map(classeJudicialOutputResolverDTO);
};

export const searchClasseJudicial: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(ClasseJudicialType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
