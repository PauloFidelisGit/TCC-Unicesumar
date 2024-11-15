import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickAnotacoesProcesso } from "../../../domain/entities/anotacoes-processo.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { anotacoesProcessoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickAnotacoesProcessoInputResolverDTO,
  PickAnotacoesProcessoOutputResolverDTO,
} from "./anotacoes-processo.resolver-dto.js";

export type CreateAnotacoesProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAnotacoesProcessoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    titulo: string;
    descricao?: string | null;
    processo_uuid: string;
    criado_por_advogado_uuid: string;
  }>,
  Promise<
    PickAnotacoesProcessoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateAnotacoesProcessoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createAnotacoesProcesso"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      titulo: x.string({ label: "titulo" }),
      descricao: x.string({ label: "descricao" }).nullish(),
      processo_uuid: x.uuid({ label: "processo_uuid" }),
      criado_por_advogado_uuid: x.uuid({ label: "criado_por_advogado_uuid" }),
    })
    .parse(props);

  const entity: PickAnotacoesProcesso<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    titulo: string;
    descricao?: string | null;
    processo_uuid: Uuid<string>;
    criado_por_advogado_uuid: Uuid<string>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    titulo: data.titulo,
    descricao: data.descricao,
    processo_uuid: new Uuid(data.processo_uuid),
    criado_por_advogado_uuid: new Uuid(data.criado_por_advogado_uuid),
  };

  const result = await anotacoesProcessoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    titulo: entity.titulo,
    descricao: entity.descricao,
    processo_uuid: entity.processo_uuid.value,
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

export const createAnotacoesProcesso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateAnotacoesProcesso",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    titulo: NonNullString,
    descricao: String,
    processo_uuid: NonNullString,
    criado_por_advogado_uuid: NonNullString,
  },
  resolve,
};
