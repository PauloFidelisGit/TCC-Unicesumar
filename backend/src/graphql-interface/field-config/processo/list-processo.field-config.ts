import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  processoRepositoryColumns,
  ProcessoRepositoryDTO,
} from "../../../domain/repositories/processo.repository-abstract.js";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { makeListCursor } from "../../../infra/persistence/mariadb/utils/make-list-cursors.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Boolean, NonNullInt } from "../../types/aliases.js";
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

export type ListProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    cursor: number;
    limit: number;
    count?: boolean;
  },
  Promise<{
    nextCursor: number | null;
    data: (Partial<ProcessoOutputResolverDTO> & {
      advogado?: Awaited<ReturnType<AdvogadoProcessoFieldResolverType>>;
      orgao?: Awaited<ReturnType<OrgaoProcessoFieldResolverType>>;
      classe_judicial?: Awaited<
        ReturnType<ClasseJudicialProcessoFieldResolverType>
      >;
      polos?: Awaited<ReturnType<PolosProcessoFieldResolverType>>;
    })[];
    count: number | null;
  }>
>;

const resolve: ListProcessoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["listProcesso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof ProcessoRepositoryDTO)[]>(
    extractFields["listProcesso"].data,
    {
      allowedFields: processoRepositoryColumns,
    },
  );

  const data = z
    .object({
      cursor: x.number({ label: "cursor" }).int().min(0),
      limit: x.number({ label: "limit" }).int().positive(),
    })
    .parse(props);

  const result = await processoRepository.list({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar os processos.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(processoOutputResolverDTO);

  const count = props.count
    ? await processoRepository.count().then((v) => {
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

export const listProcesso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "ListProcesso",
    fields: {
      data: { type: new GraphQLList(ProcessoType) },
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
