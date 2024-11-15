import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  anotacoesCasoRepositoryColumns,
  AnotacoesCasoRepositoryDTO,
} from "../../../domain/repositories/anotacoes-caso.repository-abstract.js";
import { anotacoesCasoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { AnotacoesCasoType } from "../../types/anotacoes-caso.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import { AdvogadoCasoFieldResolverType } from "./advogado-caso.field-resolve.js";
import {
  AnotacoesCasoOutputResolverDTO,
  anotacoesCasoOutputResolverDTO,
} from "./anotacoes-caso.resolver-dto.js";

export type SearchAnotacoesCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof AnotacoesCasoRepositoryDTO;
  },
  Promise<
    (Partial<AnotacoesCasoOutputResolverDTO> & {
      advogado?: Awaited<ReturnType<AdvogadoCasoFieldResolverType>>;
    })[]
  >
>;

const resolve: SearchAnotacoesCasoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchAnotacoesCaso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof AnotacoesCasoRepositoryDTO)[]>(
    extractFields["searchAnotacoesCaso"],
    {
      allowedFields: anotacoesCasoRepositoryColumns,
    },
  );

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, anotacoesCasoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await anotacoesCasoRepository.search({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar as anotações.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(anotacoesCasoOutputResolverDTO);
};

export const searchAnotacoesCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(AnotacoesCasoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
