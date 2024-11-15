import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  processoRepositoryColumns,
  ProcessoRepositoryDTO,
} from "../../../domain/repositories/processo.repository-abstract.js";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { ProcessoType } from "../../types/processo.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import { AdvogadoProcessoFieldResolverType } from "./advogado-processo.field-resolver.js";
import { ClasseJudicialProcessoFieldResolverType } from "./classe-judicial-processo.field-resolver.js";
import { OrgaoProcessoFieldResolverType } from "./orgao-processo.field-resolver.js";
import { PolosProcessoFieldResolverType } from "./polos-processo.field-resolver.js";
import {
  ProcessoOutputResolverDTO,
  processoOutputResolverDTO,
} from "./processo.resolver-dto.js";

export type FindProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof ProcessoRepositoryDTO;
    value: string | number;
  },
  Promise<
    Partial<ProcessoOutputResolverDTO> & {
      advogado?: Awaited<ReturnType<AdvogadoProcessoFieldResolverType>>;
      orgao?: Awaited<ReturnType<OrgaoProcessoFieldResolverType>>;
      classe_judicial?: Awaited<
        ReturnType<ClasseJudicialProcessoFieldResolverType>
      >;
      polos?: Awaited<ReturnType<PolosProcessoFieldResolverType>>;
    }
  >
>;

const resolve: FindProcessoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findProcesso"]))
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof ProcessoRepositoryDTO)[]>(
    extractFields["findProcesso"],
    {
      allowedFields: processoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, processoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await processoRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar o processo.", {
      errors: [{ message: result.message }],
    });
  }

  return processoOutputResolverDTO(result.value);
};

export const findProcesso: GraphQLFieldConfig<any, any, any> = {
  type: ProcessoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
