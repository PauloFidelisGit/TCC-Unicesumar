import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickRelacionamentoCasoProcesso } from "../../../domain/entities/relacionamento-caso-processo.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { relacionamentoCasoProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import {
  PickRelacionamentoCasoProcessoInputResolverDTO,
  PickRelacionamentoCasoProcessoOutputResolverDTO,
} from "./relacionamento-caso-processo.resolver-dto.js";
import { sanitizeErrorRelacionamentoCasoProcesso } from "./relacionamento-caso-processo.sanitize-error.js";
import { relacionamentoCasoProcessoSchema } from "./relacionamento-caso-processo.schema.js";

export type CreateRelacionamentoCasoProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickRelacionamentoCasoProcessoInputResolverDTO<{
    criado_em: string;
    caso_uuid: string;
    processo_uuid: string;
  }>,
  Promise<
    PickRelacionamentoCasoProcessoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateRelacionamentoCasoProcessoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) =>
      requiredAll(["createRelacionamentoCasoProcesso"]),
    )
    .executeRules();
  const data = z
    .object({
      criado_em: relacionamentoCasoProcessoSchema.criado_em,
      caso_uuid: relacionamentoCasoProcessoSchema.caso_uuid,
      processo_uuid: relacionamentoCasoProcessoSchema.processo_uuid,
    })
    .parse(props);

  const entity: PickRelacionamentoCasoProcesso<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    caso_uuid: Uuid<string>;
    processo_uuid: Uuid<string>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    caso_uuid: new Uuid(data.caso_uuid),
    processo_uuid: new Uuid(data.processo_uuid),
  };
  const result = await relacionamentoCasoProcessoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    caso_uuid: entity.caso_uuid.value,
    processo_uuid: entity.processo_uuid.value,
  });
  if (!result.success) {
    const messages = sanitizeErrorRelacionamentoCasoProcesso(result);
    throw new ResolverError("Não foi possível criar o relacionamento.", {
      errors: [messages],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createRelacionamentoCasoProcesso: GraphQLFieldConfig<
  any,
  any,
  any
> = {
  type: new GraphQLObjectType({
    name: "CreateRelacionamentoCasoProcesso",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    caso_uuid: NonNullString,
    processo_uuid: String,
  },
  resolve,
};
