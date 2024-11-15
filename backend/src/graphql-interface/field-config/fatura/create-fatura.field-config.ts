import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { STATUS_FATURA } from "../../../domain/enums/STATUS_FATURA.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { FloatValue } from "../../../domain/vo/float-value.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { faturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import {
  NonNullFloat,
  NonNullInt,
  NonNullString,
  String,
} from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";

export type CreateFaturaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    criado_em: Datetime<string>["toDateTime"];
    fatura: {
      valor_total: number;
      data_emissao: string;
      observacoes: string | undefined;
      criado_por_advogado_uuid: string;
    };
    parcelas: {
      numero: number;
      valor: FloatValue<number>["value"];
      data_vencimento: Datetime<string>["toDate"];
    }[];
    ordens_servico: {
      uuid: string;
    }[];
  },
  Promise<{
    fatura_uuid: string;
  }>
>;

const resolve: CreateFaturaType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createFatura"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      fatura: z.object({
        valor_total: x.float({ label: "valor_total" }),
        data_emissao: x.dateISO8601({ label: "data_emissao" }),
        observacoes: x.string({ label: "observacoes" }).optional(),
        criado_por_advogado_uuid: x.uuid({ label: "criado_por_advogado_uuid" }),
      }),
      parcelas: z.array(
        z.object({
          numero: x.number({ label: "numero" }).int().positive(),
          valor: x.float({ label: "valor" }),
          data_vencimento: x.dateISO8601({ label: "data_vencimento" }),
        }),
      ),
      ordens_servico: z.array(
        z.object({
          uuid: x.uuid({ label: "uuid" }),
        }),
      ),
    })
    .parse(props);

  const fatura_uuid = Uuid.create();
  const criado_em = new Datetime(data.criado_em);

  const result = await faturaRepository.createFatura({
    fatura: {
      uuid: fatura_uuid.value,
      criado_em: new Datetime(data.criado_em).toDatabaseTimeStamp,
      valor_total: new FloatValue(data.fatura.valor_total).value,
      data_emissao: new Datetime(data.fatura.data_emissao).toDatabaseTimeStamp,
      status_fatura: STATUS_FATURA.PENDENTE,
      observacoes: data.fatura.observacoes,
      criado_por_advogado_uuid: new Uuid(data.fatura.criado_por_advogado_uuid)
        .value,
    },
    parcelas: data.parcelas.map((v) => ({
      uuid: Uuid.create().value,
      criado_em: criado_em.toDatabaseTimeStamp,
      fatura_uuid: fatura_uuid.value,
      numero: v.numero,
      valor: new FloatValue(v.valor).value,
      data_vencimento: new Datetime(v.data_vencimento).toDate,
    })),
    ordens_servico: data.ordens_servico.map((v) => ({
      uuid: v.uuid,
      data: {
        atualizado_em: criado_em.toDatabaseTimeStamp,
        fatura_uuid: fatura_uuid.value,
      },
    })),
  });

  if (!result.success) {
    throw new Error("Erro ao criar fatura.");
  }

  console.dir(result, { depth: null });

  return {
    fatura_uuid: result.value.createFatura.uuid,
  };
};

export const createFatura: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateFatura",
    fields: {
      fatura_uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    fatura: {
      type: new GraphQLInputObjectType({
        name: "CreateFatura_fatura",
        fields: {
          valor_total: NonNullFloat,
          data_emissao: NonNullString,
          observacoes: String,
          criado_por_advogado_uuid: NonNullString,
        },
      }),
    },
    parcelas: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: "CreateFatura_parcelas",
          fields: {
            numero: NonNullInt,
            valor: NonNullFloat,
            data_vencimento: NonNullString,
          },
        }),
      ),
    },
    ordens_servico: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: "CreateFatura_ordens_servico",
          fields: {
            uuid: NonNullString,
          },
        }),
      ),
    },
  },
  resolve,
};
