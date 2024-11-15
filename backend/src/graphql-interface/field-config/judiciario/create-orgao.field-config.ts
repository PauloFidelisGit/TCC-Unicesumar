import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickOrgao } from "../../../domain/entities/orgao.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { orgaoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";

import { x } from "../../utils/custom-zod.js";
import {
  PickOrgaoInputResolverDTO,
  PickOrgaoOutputResolverDTO,
} from "./orgao.resolver-dto.js";

export type CreateOrgaoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickOrgaoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    nome: string;
    tribunal_uuid: string;
    municipio_uuid: string;
  }>,
  Promise<
    PickOrgaoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateOrgaoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createOrgao"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      nome: x.string({ label: "nome" }),
      tribunal_uuid: x.uuid({ label: "tribunal_uuid" }),
      municipio_uuid: x.uuid({ label: "municipio_uuid" }),
    })
    .parse(props);

  const entity: PickOrgao<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    nome: string;
    tribunal_uuid: Uuid<string>;
    municipio_uuid: Uuid<string>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    nome: data.nome,
    tribunal_uuid: new Uuid(data.tribunal_uuid),
    municipio_uuid: new Uuid(data.municipio_uuid),
  };

  const result = await orgaoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    nome: entity.nome,
    municipio_uuid: entity.municipio_uuid.value,
    tribunal_uuid: entity.tribunal_uuid.value,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível criar o órgao.", {
      errors: [{ message: result.message }],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createOrgao: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateOrgao",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    nome: NonNullString,
    tribunal_uuid: NonNullString,
    municipio_uuid: NonNullString,
  },
  resolve,
};
