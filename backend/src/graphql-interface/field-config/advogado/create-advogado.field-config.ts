import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import { PickAdvogado } from "../../../domain/entities/advogado.entity.js";
import { PickRelacionamentoPermissaoAdvogado } from "../../../domain/entities/relacionamento-permissao-advogado.entity.js";
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
import { allPermissions } from "../../security/all-permissions.js";
import { OabInput } from "../../types/advogado.graphql-type.js";
import { ArrayString, NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickAdvogadoInputResolverDTO } from "./advogado.resolver-dto.js";
import { advogadoSanitizeError } from "./advogado.sanitize-error.js";

export type CreateAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAdvogadoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    login: string;
    senha: string;
    telefones?: string[] | null;
    emails?: string[] | null;
    nome: string;
    data_nascimento?: string | null;
    nacionalidade?: string | null;
    estado_civil?: ESTADO_CIVIL | null;
    cpf?: string | null;
    oab?: OabType[] | null;
  }>,
  Promise<{
    uuid: string;
  }>
>;

const resolve: CreateAdvogadoType = async (_parent, props, _context, _info) => {
  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      senha: x.string({ label: "senha", min: 8 }),
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
          })
        )
        .nullish(),
    })
    .parse(props);

  const nanoid = customAlphabet("1234567890abcdef", 5);

  const entityAdvogado: PickAdvogado<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    login: string;
    senha: Password<string>;
    telefones?: Telefones<string[] | undefined | null>;
    emails?: Emails<string[] | undefined | null>;
    nome: string;
    data_nascimento?: Datetime<string | undefined | null>;
    nacionalidade?: string | null;
    estado_civil?: ESTADO_CIVIL | null;
    cpf?: CPF<string>;
    oab?: Oab<OabType[]>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    login: `A${nanoid()}`.toUpperCase(),
    senha: new Password(data.senha),
    telefones: new Telefones(data.telefones),
    emails: new Emails(data.emails),
    nome: data.nome,
    data_nascimento: new Datetime(data.data_nascimento),
    nacionalidade: data.nacionalidade,
    estado_civil: data.estado_civil,
    cpf: data.cpf ? new CPF(data.cpf) : undefined,
    oab: data.oab ? new Oab(data.oab) : undefined,
  };

  const entityRelacionamentoPermissaoAdvogado: PickRelacionamentoPermissaoAdvogado<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    advogado_uuid: Uuid<string>;
    permissao_advogado_uuid: Uuid<string>;
  }>[] = allPermissions.map(({ uuid }) => ({
    uuid: Uuid.create(),
    criado_em: entityAdvogado.criado_em,
    advogado_uuid: entityAdvogado.uuid,
    permissao_advogado_uuid: new Uuid(uuid),
  }));

  const result = await advogadoRepository.save({
    advogado: {
      uuid: entityAdvogado.uuid.value,
      criado_em: entityAdvogado.criado_em.toDatabaseTimeStamp,
      login: entityAdvogado.login,
      senha: await entityAdvogado.senha?.encrypted(),
      telefones: entityAdvogado.telefones?.toString,
      emails: entityAdvogado.emails?.toString,
      nome: entityAdvogado.nome,
      data_nascimento: entityAdvogado.data_nascimento?.toDatabaseTimeStamp,
      nacionalidade: entityAdvogado.nacionalidade,
      estado_civil: entityAdvogado.estado_civil,
      cpf: entityAdvogado.cpf?.value,
      oab: entityAdvogado.oab?.toString,
    },
    permissoes: entityRelacionamentoPermissaoAdvogado.map((v) => ({
      uuid: v.uuid.value,
      criado_em: v.criado_em.toDatabaseTimeStamp,
      advogado_uuid: v.advogado_uuid.value,
      permissao_advogado_uuid: v.permissao_advogado_uuid.value,
    })),
  });

  if (!result.success) {
    let error = advogadoSanitizeError(result);
    throw new ResolverError("Não foi possível criar o advogado.", {
      errors: [{ message: error.message }],
    });
  }

  return result.value.createAdvogado;
};

export const createAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateAdvogado",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    senha: NonNullString,
    telefones: ArrayString,
    emails: ArrayString,
    nome: NonNullString,
    nacionalidade: String,
    estado_civil: String,
    data_nascimento: String,
    cpf: String,
    oab: { type: new GraphQLList(OabInput) },
  },
  resolve,
};
