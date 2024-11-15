import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
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
import {
  PickEnderecoInputResolverDTO,
  PickEnderecoOutputResolverDTO,
} from "./endereco.resolver-dto.js";
import { enderecoSanitizeError } from "./endereco.sanitize-error.js";

export type CreateEnderecoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickEnderecoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    cep?: string | null;
    advogado_uuid?: string | null;
    pessoa_uuid?: string | null;
  }>,
  Promise<
    PickEnderecoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateEnderecoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createEndereco"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      logradouro: x.string({ label: "logradouro" }).nullish(),
      numero: x.string({ label: "numero" }).nullish(),
      complemento: x.string({ label: "complemento" }).nullish(),
      bairro: x.string({ label: "bairro" }).nullish(),
      cidade: x.string({ label: "cidade" }).nullish(),
      estado: x.string({ label: "estado" }).nullish(),
      cep: x.string({ label: "cep" }).nullish(),
      advogado_uuid: x.uuid({ label: "advogado_uuid" }).nullable().optional(),
      pessoa_uuid: x.uuid({ label: "pessoa_uuid" }).nullish(),
    })
    .superRefine((data, ctx) => {
      if (
        [undefined, null].includes(data.advogado_uuid as any) &&
        [undefined, null].includes(data.pessoa_uuid as any)
      ) {
        return ctx.addIssue({
          code: "custom",
          message:
            "Os campos 'advogado_uuid' ou 'pessoa_uuid' são obrigatórios.",
        });
      }
    })
    .parse(props);
  const entity: PickEndereco<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    cep?: string | null;
    advogado_uuid?: Uuid<string | undefined | null>;
    pessoa_uuid?: Uuid<string | undefined | null>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    logradouro: data.logradouro,
    numero: data.numero,
    complemento: data.complemento,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado,
    cep: data.cep,
    advogado_uuid: new Uuid(data.advogado_uuid),
    pessoa_uuid: new Uuid(data.pessoa_uuid),
  };
  const result = await enderecoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    logradouro: entity.logradouro,
    numero: entity.numero,
    complemento: entity.complemento,
    bairro: entity.bairro,
    cidade: entity.cidade,
    estado: entity.estado,
    cep: entity.cep,
    advogado_uuid: entity.advogado_uuid?.value,
    pessoa_uuid: entity.pessoa_uuid?.value,
  });
  if (!result.success) {
    let error = enderecoSanitizeError(result);
    throw new ResolverError("Não foi possível criar o endereço.", {
      errors: [{ message: error.message }],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createEndereco: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateEndereco",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
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
  resolve,
};
