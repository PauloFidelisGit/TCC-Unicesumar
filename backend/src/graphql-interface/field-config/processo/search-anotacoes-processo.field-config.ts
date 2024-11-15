import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from "graphql";
import { z } from "zod";
import {
  anotacoesProcessoRepositoryColumns,
  AnotacoesProcessoRepositoryDTO,
} from "../../../domain/repositories/anotacoes-processo.repository-abstract.js";
import { anotacoesProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullInt, NonNullString } from "../../types/aliases.js";
import { AnotacoesProcessoType } from "../../types/anotacoes-processo.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import { AdvogadoAnotacoesProcessoFieldResolverType } from "./advogado-anotacoes-processo.field-resolver.js";
import {
  AnotacoesProcessoOutputResolverDTO,
  anotacoesProcessoOutputResolverDTO,
} from "./anotacoes-processo.resolver-dto.js";

export type SearchAnotacoesProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    limit: number;
    value: string | number;
    where: keyof AnotacoesProcessoRepositoryDTO;
  },
  Promise<
    (Partial<AnotacoesProcessoOutputResolverDTO> & {
      advogado?: Awaited<
        ReturnType<AdvogadoAnotacoesProcessoFieldResolverType>
      >;
    })[]
  >
>;

const resolve: SearchAnotacoesProcessoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchAnotacoesProcesso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<
    (keyof AnotacoesProcessoRepositoryDTO)[]
  >(extractFields["searchAnotacoesProcesso"], {
    allowedFields: anotacoesProcessoRepositoryColumns,
  });

  const data = z
    .object({
      limit: x.number({ label: "limit" }).int().positive(),
      where: x.enum({ label: "where" }, anotacoesProcessoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await anotacoesProcessoRepository.search({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível pesquisar as anotações.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(anotacoesProcessoOutputResolverDTO);
};

export const searchAnotacoesProcesso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(AnotacoesProcessoType),
  args: {
    where: NonNullString,
    value: NonNullString,
    limit: NonNullInt,
  },
  resolve,
};
