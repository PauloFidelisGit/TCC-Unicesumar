import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickPessoa } from "../../../domain/entities/pessoa.entity.js";
import { ESTADO_CIVIL } from "../../../domain/enums/ESTADO_CIVIL.js";
import { TIPO_PESSOA } from "../../../domain/enums/TIPO_PESSOA.js";
import { Result } from "../../../domain/types/index.js";
import { CNPJ } from "../../../domain/vo/cnpj.vo.js";
import { CPF } from "../../../domain/vo/cpf.vo.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Emails } from "../../../domain/vo/emails.vo.js";
import { Telefones } from "../../../domain/vo/telefones.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { pessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { ArrayString, NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickPessoaInputResolverDTO,
  PickPessoaOutputResolverDTO,
} from "./pessoa.resolver-dto.js";

export type CreatePessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  | {
      criado_em: string;
      tipo_pessoa: TIPO_PESSOA.PF;
      data: PickPessoaInputResolverDTO<{
        telefones?: string[] | null;
        emails?: string[] | null;
        nome: string;
        data_nascimento?: string | null;
        nacionalidade?: string | null;
        profissao?: string | null;
        estado_civil?: ESTADO_CIVIL | null;
        cpf?: string | null;
      }>;
    }
  | {
      criado_em: string;
      tipo_pessoa: TIPO_PESSOA.PJ;
      data: PickPessoaInputResolverDTO<{
        telefones?: string[] | null;
        emails?: string[] | null;
        nome_fantasia: string;
        razao_social?: string | null;
        cnpj?: string | null;
      }>;
    },
  Promise<
    PickPessoaOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreatePessoaType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createPessoa"]))
    .executeRules();

  let result = null as unknown as Result<{
    uuid: string;
  }>;

  if (props.tipo_pessoa === TIPO_PESSOA.PF) {
    const data = z
      .object({
        criado_em: x.dateISOString({ label: "criado_em" }),
        tipo_pessoa: z.literal(TIPO_PESSOA.PF),
        data: z
          .object({
            telefones: x.string({ label: "telefones" }).array().optional(),
            emails: x.string({ label: "emails" }).array().optional(),
            nome: x.string({ label: "nome" }),
            data_nascimento: x
              .dateISO8601({ label: "data_nascimento" })
              .optional(),
            nacionalidade: x.string({ label: "nacionalidade" }).optional(),
            profissao: x.string({ label: "profissao" }).optional(),
            estado_civil: x
              .nativeEnum({ label: "estado_civil" }, ESTADO_CIVIL)
              .optional(),
            cpf: x.string({ label: "cpf" }).optional(),
          })
          .strict(),
      })
      .parse(props);

    const pessoaPF: PickPessoa<{
      uuid: Uuid<string>;
      criado_em: Datetime<string>;
      telefones?: Telefones<string[] | undefined | null>;
      emails?: Emails<string[] | undefined | null>;
      tipo_pessoa: TIPO_PESSOA;
      nome: string | null;
      data_nascimento?: Datetime<string | undefined | null>;
      nacionalidade?: string | null;
      profissao?: string | null;
      estado_civil?: ESTADO_CIVIL | null;
      cpf?: CPF<string | undefined | null>;
    }> = {
      uuid: Uuid.create(),
      criado_em: new Datetime(data.criado_em),
      telefones: new Telefones(data.data.telefones),
      emails: new Emails(data.data.emails),
      tipo_pessoa: data.tipo_pessoa,
      nome: data.data.nome,
      data_nascimento: new Datetime(data.data.data_nascimento),
      nacionalidade: data.data.nacionalidade,
      profissao: data.data.profissao,
      estado_civil: data.data.estado_civil,
      cpf: new CPF(data.data.cpf),
    };

    result = await pessoaRepository.save({
      uuid: pessoaPF.uuid.value,
      criado_em: pessoaPF.criado_em.toDatabaseTimeStamp,
      telefones: pessoaPF.telefones?.toString,
      emails: pessoaPF.emails?.toString,
      tipo_pessoa: pessoaPF.tipo_pessoa,
      nome: pessoaPF.nome,
      data_nascimento: pessoaPF.data_nascimento?.toDatabaseTimeStamp,
      nacionalidade: pessoaPF.nacionalidade,
      profissao: pessoaPF.profissao,
      estado_civil: pessoaPF.estado_civil,
      cpf: pessoaPF.cpf?.value,
    });
  } else if (props.tipo_pessoa === TIPO_PESSOA.PJ) {
    const data = z
      .object({
        criado_em: x.dateISOString({ label: "criado_em" }),
        tipo_pessoa: z.literal(TIPO_PESSOA.PJ),
        data: z
          .object({
            telefones: x.string({ label: "telefones" }).array().optional(),
            emails: x.string({ label: "emails" }).array().optional(),
            nome_fantasia: x.string({ label: "nome_fantasia" }).min(1),
            razao_social: x.string({ label: "razao_social" }).optional(),
            cnpj: x.string({ label: "cnpj" }).optional(),
          })
          .strict(),
      })
      .parse(props);

    const pessoaPJ: PickPessoa<{
      uuid: Uuid<string>;
      criado_em: Datetime<string>;
      telefones?: Telefones<string[] | undefined | null>;
      emails?: Emails<string[] | undefined | null>;
      tipo_pessoa: TIPO_PESSOA;
      nome_fantasia: string;
      razao_social?: string | null;
      cnpj?: CNPJ<string | undefined | null>;
    }> = {
      uuid: Uuid.create(),
      criado_em: new Datetime(data.criado_em),
      telefones: new Telefones(data.data.telefones),
      emails: new Emails(data.data.emails),
      tipo_pessoa: data.tipo_pessoa,
      nome_fantasia: data.data.nome_fantasia,
      razao_social: data.data.razao_social,
      cnpj: new CNPJ(data.data.cnpj),
    };
    result = await pessoaRepository.save({
      uuid: pessoaPJ.uuid.value,
      criado_em: pessoaPJ.criado_em.toDatabaseTimeStamp,
      telefones: pessoaPJ.telefones?.toString,
      emails: pessoaPJ.emails?.toString,
      tipo_pessoa: pessoaPJ.tipo_pessoa,
      nome_fantasia: pessoaPJ.nome_fantasia,
      razao_social: pessoaPJ.razao_social,
      cnpj: pessoaPJ.cnpj?.value,
    });
  }
  if (!result.success) {
    throw new ResolverError("Não foi possível criar a pessoa.", {
      errors: [{ message: result.message }],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createPessoa: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreatePessoa",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    tipo_pessoa: NonNullString,
    data: {
      type: new GraphQLNonNull(
        new GraphQLInputObjectType({
          name: "CreatePessoa_data",
          fields: {
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
      ),
    },
  },
  resolve,
};
