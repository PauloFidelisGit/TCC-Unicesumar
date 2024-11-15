import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickEndereco } from "../../../domain/entities/endereco.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { enderecoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickEnderecoInputResolverDTO } from "./endereco.resolver-dto.js";

export type UpdateEnderecoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickEnderecoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      logradouro?: string | null;
      numero?: string | null;
      complemento?: string | null;
      bairro?: string | null;
      cidade?: string | null;
      estado?: string | null;
      cep?: string | null;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateEnderecoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateEndereco"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        logradouro: x.string({ label: "logradouro" }).nullish(),
        numero: x.string({ label: "numero" }).nullish(),
        complemento: x.string({ label: "complemento" }).nullish(),
        bairro: x.string({ label: "bairro" }).nullish(),
        cidade: x.string({ label: "cidade" }).nullish(),
        estado: x.string({ label: "estado" }).nullish(),
        cep: x.string({ label: "cep" }).nullish(),
      }),
    })
    .parse(props);

  const entity: PickEndereco<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    cep?: string | null;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    logradouro: data.data.logradouro,
    numero: data.data.numero,
    complemento: data.data.complemento,
    bairro: data.data.bairro,
    cidade: data.data.cidade,
    estado: data.data.estado,
    cep: data.data.cep,
  };

  const result = await enderecoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      logradouro: entity.logradouro,
      numero: entity.numero,
      complemento: entity.complemento,
      bairro: entity.bairro,
      cidade: entity.cidade,
      estado: entity.estado,
      cep: entity.cep,
    },
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }

  return true;
};

export const updateEndereco: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateEndereco_data",
        fields: {
          atualizado_em: String,
          logradouro: String,
          numero: String,
          complemento: String,
          bairro: String,
          cidade: String,
          estado: String,
          cep: String,
          advogado_uuid: String,
          pessoa_uuid: String,
        },
      }),
    },
  },
  resolve,
};
