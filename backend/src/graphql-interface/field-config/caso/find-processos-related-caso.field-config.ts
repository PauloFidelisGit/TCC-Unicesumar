import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import {
  processoRepositoryColumns,
  ProcessoRepositoryDTO,
} from "../../../domain/repositories/processo.repository-abstract.js";
import {
  relacionamentoCasoProcessoRepositoryColumns,
  RelacionamentoCasoProcessoRepositoryDTO,
} from "../../../domain/repositories/relacionamento-caso-processo.repository-abstract.js";
import { relacionamentoCasoProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { ProcessoType } from "../../types/processo.graphql-type.js";
import { RawFieldsRelacionamentoCasoProcessoType } from "../../types/relacionamento-caso-processo.graphql-type.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ProcessoOutputResolverDTO,
  processoOutputResolverDTO,
} from "../processo/processo.resolver-dto.js";
import {
  RelacionamentoCasoProcessoOutputResolverDTO,
  relacionamentoCasoProcessoOutputResolverDTO,
} from "./relacionamento-caso-processo.resolver-dto.js";

export type FindProcessosRelatedCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    caso_uuid: string;
  },
  Promise<
    (Partial<RelacionamentoCasoProcessoOutputResolverDTO> & {
      processo?: Partial<ProcessoOutputResolverDTO>;
    })[]
  >
>;

const resolve: FindProcessosRelatedCasoType = async (
  _parent,
  props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["findProcesso"]))
    .executeRules();
  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const rootKeys = extractFields?.["findProcessosRelatedCaso"];

  const fieldsKeysRelacionamentoCasoProcesso = fields.toStringArray<
    (keyof RelacionamentoCasoProcessoRepositoryDTO)[]
  >(rootKeys, {
    allowedFields: relacionamentoCasoProcessoRepositoryColumns,
  });

  const fieldsKeysProcesso = fields.toStringArray<
    (keyof ProcessoRepositoryDTO)[]
  >(rootKeys?.["processo"], {
    allowedFields: processoRepositoryColumns,
  });

  const data = z
    .object({
      caso_uuid: x.uuid({ label: "caso_uuid" }),
    })
    .parse(props);

  const result =
    await relacionamentoCasoProcessoRepository.findProcessosRelatedCaso({
      caso_uuid: data.caso_uuid,
      fields: {
        processo: fieldsKeysProcesso,
        relacionamento_caso_processo: fieldsKeysRelacionamentoCasoProcesso,
      },
    });

  if (!result.success) {
    throw new ResolverError("Não foi possível listar os processos do caso.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map((item) => {
    return {
      ...relacionamentoCasoProcessoOutputResolverDTO(item),
      ...(item.processo && {
        processo: processoOutputResolverDTO(item?.processo),
      }),
    };
  });

  return mappedData;
};

export const findProcessosRelatedCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: "FindProcessosRelatedCaso",
      fields: {
        ...RawFieldsRelacionamentoCasoProcessoType,
        processo: { type: ProcessoType },
      },
    }),
  ),
  args: {
    caso_uuid: NonNullString,
  },
  resolve,
};
