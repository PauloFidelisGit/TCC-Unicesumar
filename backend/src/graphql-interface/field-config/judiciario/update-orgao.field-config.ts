import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickOrgao } from "../../../domain/entities/orgao.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { orgaoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickOrgaoInputResolverDTO } from "./orgao.resolver-dto.js";

export type UpdateOrgaoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickOrgaoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      nome?: string;
      tribunal_uuid?: string;
      municipio_uuid?: string;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateOrgaoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateOrgao"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        nome: x.string({ label: "nome" }),
        tribunal_uuid: x.uuid({ label: "tribunal_uuid" }).optional(),
        municipio_uuid: x.uuid({ label: "municipio_uuid" }).optional(),
      }),
    })
    .parse(props);

  const entity: PickOrgao<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    nome?: string;
    tribunal_uuid?: Uuid<string | undefined>;
    municipio_uuid?: Uuid<string | undefined>;
  }> = {
    uuid: new Uuid(props.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    nome: data.data.nome,
    tribunal_uuid: new Uuid(data.data.tribunal_uuid),
    municipio_uuid: new Uuid(data.data.municipio_uuid),
  };

  const result = await orgaoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      nome: entity.nome,
      municipio_uuid: entity.municipio_uuid?.value,
      tribunal_uuid: entity.tribunal_uuid?.value,
    },
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar o órgão.", {
      errors: [{ message: result.message }],
    });
  }

  return true;
};

export const updateOrgao: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateOrgao_data",
        fields: {
          atualizado_em: String,
          nome: String,
          tribunal_uuid: String,
          municipio_uuid: String,
        },
      }),
    },
  },
  resolve,
};
