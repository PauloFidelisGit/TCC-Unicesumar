import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickAnotacoesCaso } from "../../../domain/entities/anotacoes-caso.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { anotacoesCasoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickAnotacoesCasoInputResolverDTO,
  PickAnotacoesCasoOutputResolverDTO,
} from "./anotacoes-caso.resolver-dto.js";

export type CreateAnotacoesCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAnotacoesCasoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    titulo: string;
    descricao?: string | null;
    caso_uuid: string;
    criado_por_advogado_uuid: string;
  }>,
  Promise<
    PickAnotacoesCasoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateAnotacoesCasoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createAnotacoesCaso"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      titulo: x.string({ label: "titulo" }),
      descricao: x.string({ label: "descricao" }).nullish(),
      caso_uuid: x.uuid({ label: "caso_uuid" }),
      criado_por_advogado_uuid: x.uuid({ label: "criado_por_advogado_uuid" }),
    })
    .parse(props);

  const entity: PickAnotacoesCaso<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    titulo: string;
    descricao?: string | null;
    caso_uuid: Uuid<string>;
    criado_por_advogado_uuid: Uuid<string>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    titulo: data.titulo,
    descricao: data.descricao,
    caso_uuid: new Uuid(data.caso_uuid),
    criado_por_advogado_uuid: new Uuid(data.criado_por_advogado_uuid),
  };

  const result = await anotacoesCasoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    titulo: entity.titulo,
    descricao: entity.descricao,
    caso_uuid: entity.caso_uuid.value,
    criado_por_advogado_uuid: entity.criado_por_advogado_uuid.value,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível criar a anotação.", {
      errors: [{ message: result.message }],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createAnotacoesCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateAnotacoesCaso",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    titulo: NonNullString,
    descricao: String,
    caso_uuid: NonNullString,
    criado_por_advogado_uuid: NonNullString,
  },
  resolve,
};
