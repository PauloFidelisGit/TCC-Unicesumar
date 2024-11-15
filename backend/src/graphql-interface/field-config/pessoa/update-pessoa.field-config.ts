import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickPessoa } from "../../../domain/entities/pessoa.entity.js";
import { ESTADO_CIVIL } from "../../../domain/enums/ESTADO_CIVIL.js";
import { TIPO_PESSOA } from "../../../domain/enums/TIPO_PESSOA.js";
import { CNPJ } from "../../../domain/vo/cnpj.vo.js";
import { CPF } from "../../../domain/vo/cpf.vo.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Emails } from "../../../domain/vo/emails.vo.js";
import { Password } from "../../../domain/vo/password.vo.js";
import { Telefones } from "../../../domain/vo/telefones.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { pessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { ArrayString, NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickPessoaInputResolverDTO } from "./pessoa.resolver-dto.js";

export type UpdatePessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    tipo_pessoa: TIPO_PESSOA;
    data: PickPessoaInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      login?: string | null;
      senha?: string | null;
      telefones?: string[] | null;
      emails?: string[] | null;
      nome?: string | null;
      data_nascimento?: string | null;
      nacionalidade?: string | null;
      profissao?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: string | null;
      nome_fantasia?: string | null;
      razao_social?: string | null;
      cnpj?: string | null;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdatePessoaType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updatePessoa"]))
    .executeRules();

  if (props.tipo_pessoa === TIPO_PESSOA.PF) {
    const data = z
      .object({
        uuid: x.uuid({ label: "uuid" }),
        data: z.object({
          atualizado_em: x.dateISOString({ label: "atualizado_em" }),
          senha: x.string({ label: "senha" }).optional(),
          telefones: x.string({ label: "telefones" }).array().nullish(),
          emails: x.string({ label: "emails" }).array().nullish(),
          nome: x.string({ label: "nome" }).min(1),
          data_nascimento: x
            .dateISO8601({ label: "data_nascimento" })
            .nullish(),
          nacionalidade: x.string({ label: "nacionalidade" }).nullish(),
          profissao: x.string({ label: "profissao" }).nullish(),
          estado_civil: x
            .nativeEnum({ label: "estado_civil" }, ESTADO_CIVIL)
            .nullish(),
          cpf: x.string({ label: "cpf" }).nullish(),
        }),
      })
      .parse(props);

    const entity: PickPessoa<{
      uuid: Uuid<string>;
      atualizado_em: Datetime<string>;
      login?: string | null;
      senha?: Password<string | undefined | null>;
      telefones?: Telefones<string[] | undefined | null>;
      emails?: Emails<string[] | undefined | null>;
      nome?: string | null;
      data_nascimento?: Datetime<string | null>;
      nacionalidade?: string | null;
      profissao?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: CPF<string | undefined | null>;
    }> = {
      uuid: new Uuid(data.uuid),
      atualizado_em: new Datetime(data.data.atualizado_em),
      senha: new Password(data.data.senha),
      telefones: new Telefones(data.data.telefones),
      emails: new Emails(data.data.emails),
      nome: data.data.nome,
      data_nascimento: data.data.data_nascimento
        ? new Datetime(data.data.data_nascimento)
        : undefined,
      nacionalidade: data.data.nacionalidade,
      profissao: data.data.profissao,
      estado_civil: data.data.estado_civil,
      cpf: new CPF(data.data.cpf),
    };

    const result = await pessoaRepository.update({
      uuid: data.uuid,
      data: {
        atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
        senha: await entity.senha?.encrypted(),
        telefones: entity.telefones?.toString,
        emails: entity.emails?.toString,
        nome: entity.nome,
        data_nascimento: entity.data_nascimento?.toDatabaseTimeStamp,
        nacionalidade: entity.nacionalidade,
        profissao: entity.profissao,
        estado_civil: entity.estado_civil,
        cpf: entity.cpf?.value,
      },
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível atualizar a pessoa.", {
        errors: [{ message: result.message }],
      });
    }

    return true;
  }

  if (props.tipo_pessoa === TIPO_PESSOA.PJ) {
    const data = z
      .object({
        uuid: x.uuid({ label: "uuid" }),
        data: z.object({
          atualizado_em: x.dateISOString({ label: "atualizado_em" }),
          senha: x.string({ label: "senha" }).optional(),
          telefones: x.string({ label: "telefones" }).array().nullish(),
          emails: x.string({ label: "emails" }).array().nullish(),
          nome_fantasia: x.string({ label: "nome_fantasia" }),
          razao_social: x.string({ label: "razao_social" }),
          cnpj: x.string({ label: "cnpj" }),
        }),
      })
      .parse(props);

    const entity: PickPessoa<{
      uuid: Uuid<string>;
      atualizado_em: Datetime<string>;
      login?: string | null;
      senha?: Password<string | undefined | null>;
      telefones?: Telefones<string[] | undefined | null>;
      emails?: Emails<string[] | undefined | null>;
      nome_fantasia: string | null;
      razao_social: string | null;
      cnpj: CNPJ<string | null>;
    }> = {
      uuid: new Uuid(data.uuid),
      atualizado_em: new Datetime(data.data.atualizado_em),
      senha: new Password(data.data.senha),
      telefones: new Telefones(data.data.telefones),
      emails: new Emails(data.data.emails),
      nome_fantasia: data.data.nome_fantasia,
      razao_social: data.data.razao_social,
      cnpj: new CNPJ(data.data.cnpj),
    };

    const result = await pessoaRepository.update({
      uuid: data.uuid,
      data: {
        atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
        senha: await entity.senha?.encrypted(),
        telefones: entity.telefones?.toString,
        emails: entity.emails?.toString,
        nome_fantasia: entity.nome_fantasia,
        razao_social: entity.razao_social,
        cnpj: entity.cnpj.value,
      },
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível atualizar a pessoa.", {
        errors: [{ message: result.message }],
      });
    }

    return true;
  }

  throw new ResolverError("Tipo de pessoa inválido.");
};

export const updatePessoa: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    tipo_pessoa: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updatePessoa_data",
        fields: {
          atualizado_em: String,
          login: String,
          senha: String,
          telefones: ArrayString,
          emails: ArrayString,
          nome: String,
          data_nascimento: String,
          nacionalidade: String,
          profissao: String,
          estado_civil: String,
          cpf: String,
          nome_fantasia: String,
          razao_social: String,
          cnpj: String,
        },
      }),
    },
  },
  resolve,
};
