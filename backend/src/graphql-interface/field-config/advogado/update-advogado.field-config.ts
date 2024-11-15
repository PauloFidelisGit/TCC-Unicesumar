import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
} from "graphql";
import { z } from "zod";
import { PickAdvogado } from "../../../domain/entities/advogado.entity.js";
import { ESTADO_CIVIL } from "../../../domain/enums/ESTADO_CIVIL.js";
import { CPF } from "../../../domain/vo/cpf.vo.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Emails } from "../../../domain/vo/emails.vo.js";
import { Oab, OabType } from "../../../domain/vo/oab.vo.js";
import { Password } from "../../../domain/vo/password.vo.js";
import { Telefones } from "../../../domain/vo/telefones.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { OabInput } from "../../types/advogado.graphql-type.js";
import { ArrayString, NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickAdvogadoInputResolverDTO } from "./advogado.resolver-dto.js";

export type UpdateAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickAdvogadoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      senha?: string;
      telefones?: string[] | null;
      emails?: string[] | null;
      nome?: string;
      data_nascimento?: string | null;
      nacionalidade?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: string | null;
      oab?: OabType[] | null;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateAdvogadoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateAdvogado"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        senha: x.string({ label: "senha", min: 8 }).optional(),
        telefones: x.arrayString({ label: "telefones" }).nullish(),
        emails: x.arrayString({ label: "emails" }).nullish(),
        nome: x.string({ label: "nome" }),
        data_nascimento: x.dateISO8601({ label: "data_nascimento" }).nullish(),
        nacionalidade: x.string({ label: "nacionalidade" }).nullish(),
        estado_civil: x
          .nativeEnum({ label: "estado_civil" }, ESTADO_CIVIL)
          .nullish(),
        cpf: x.string({ label: "cpf", length: 11 }).nullish(),
        oab: x
          .array(
            { label: "oab" },
            z.object({
              numero: x.string({ label: "numero", max: 999999 }),
              uf: x.string({ label: "uf", length: 2 }),
              letra: x.string({ label: "letra", length: 1 }),
            }),
          )
          .nullish(),
      }),
    })
    .parse(props);

  const entity: PickAdvogado<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    login?: string;
    senha?: Password<string | undefined>;
    telefones?: Telefones<string[] | undefined | null>;
    emails?: Emails<string[] | undefined>;
    nome?: string;
    data_nascimento?: Datetime<string | undefined | null>;
    nacionalidade?: string | null;
    estado_civil?: ESTADO_CIVIL | null;
    cpf?: CPF<string | undefined | null>;
    oab?: Oab<OabType[]>;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    senha: new Password(data.data.senha),
    telefones: new Telefones(data.data.telefones),
    emails: data.data.emails ? new Emails(data.data.emails) : undefined,
    nome: data.data.nome,
    data_nascimento: new Datetime(data.data.data_nascimento),
    nacionalidade: data.data.nacionalidade,
    estado_civil: data.data.estado_civil,
    cpf: new CPF(data.data.cpf),
    oab: data.data.oab ? new Oab(data.data.oab) : undefined,
  };

  const result = await advogadoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      senha: await entity.senha?.encrypted(),
      telefones: entity.telefones?.toString,
      emails: entity.emails?.toString,
      nome: entity.nome,
      data_nascimento: entity.data_nascimento?.toDatabaseTimeStamp,
      nacionalidade: entity.nacionalidade,
      estado_civil: entity.estado_civil,
      cpf: entity.cpf?.value,
      oab: entity.oab?.toString,
    },
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar o advogado.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateAdvogado_data",
        fields: {
          atualizado_em: String,
          senha: String,
          permissoes: {
            type: new GraphQLList(GraphQLString),
          },
          telefones: ArrayString,
          emails: ArrayString,
          nome: String,
          nacionalidade: String,
          estado_civil: String,
          data_nascimento: String,
          cpf: String,
          oab: { type: new GraphQLList(OabInput) },
        },
      }),
    },
  },
  resolve,
};
