import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { z } from "zod";
import { STATUS_FATURA } from "../../../domain/enums/STATUS_FATURA.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { FloatValue } from "../../../domain/vo/float-value.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { faturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import {
  NonNullFloat,
  NonNullInt,
  NonNullString,
  String,
} from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";

export type UpdateFaturaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    atualizado_em: Datetime<string>["toDateTime"];
    fatura: {
      uuid: string;
      valor_total: number;
      data_emissao: string;
      observacoes: string | undefined;
    };
    parcelas: {
      numero: number;
      valor: FloatValue<number>["value"];
      data_vencimento: Datetime<string>["toDate"];
      data_pagamento: Datetime<string>["toDate"] | null;
    }[];
    ordens_servico: {
      uuid: string;
    }[];
  },
  Promise<boolean>
>;

const resolve: UpdateFaturaType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateFatura"]))
    .executeRules();

  const data = z
    .object({
      atualizado_em: x.dateISOString({ label: "criado_em" }),
      fatura: z.object({
        uuid: x.uuid({ label: "uuid" }),
        valor_total: x.float({ label: "valor_total" }),
        data_emissao: x.dateISO8601({ label: "data_emissao" }),
        observacoes: x.string({ label: "observacoes" }).nullish(),
      }),
      parcelas: z.array(
        z.object({
          numero: x.number({ label: "numero" }).int().positive(),
          valor: x.float({ label: "valor" }),
          data_vencimento: x.dateISO8601({ label: "data_vencimento" }),
          data_pagamento: x.dateISO8601({ label: "data_pagamento" }).nullish(),
        })
      ),
      ordens_servico: z.array(
        z.object({
          uuid: x.uuid({ label: "uuid" }),
        })
      ),
    })
    .parse(props);

  const parcelas = data.parcelas.map((v) => ({
    uuid: Uuid.create().value,
    criado_em: new Datetime(data.atualizado_em).toDatabaseTimeStamp,
    fatura_uuid: data.fatura.uuid,
    numero: v.numero,
    valor: new FloatValue(v.valor).value,
    data_vencimento: new Datetime(v.data_vencimento).toDate,
    data_pagamento: new Datetime(v.data_pagamento).toDate,
  }));

  const faturaIsPaidOff = parcelas.every((v) => !!v.data_pagamento);

  const status_fatura = faturaIsPaidOff
    ? STATUS_FATURA.QUITADA
    : STATUS_FATURA.PENDENTE;

  const result = await faturaRepository.updateFatura({
    fatura: {
      uuid: data.fatura.uuid,
      data: {
        atualizado_em: new Datetime(data.atualizado_em).toDatabaseTimeStamp,
        valor_total: new FloatValue(data.fatura.valor_total).value,
        data_emissao: new Datetime(data.fatura.data_emissao)
          .toDatabaseTimeStamp,
        status_fatura,
        observacoes: data.fatura.observacoes,
      },
    },
    parcelas,
    ordens_servico: data.ordens_servico.map((v) => ({
      uuid: v.uuid,
      data: {
        atualizado_em: new Datetime(data.atualizado_em).toDatabaseTimeStamp,
        fatura_uuid: data.fatura.uuid,
      },
    })),
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar a fatura.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateFatura: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    atualizado_em: NonNullString,
    fatura: {
      type: new GraphQLNonNull(
        new GraphQLInputObjectType({
          name: "UpdateFatura_fatura",
          fields: {
            uuid: NonNullString,
            valor_total: NonNullFloat,
            data_emissao: NonNullString,
            observacoes: String,
          },
        })
      ),
    },
    parcelas: {
      type: new GraphQLNonNull(
        new GraphQLList(
          new GraphQLInputObjectType({
            name: "UpdateFatura_parcelas",
            fields: {
              numero: NonNullInt,
              valor: NonNullFloat,
              data_vencimento: NonNullString,
              data_pagamento: String,
            },
          })
        )
      ),
    },
    ordens_servico: {
      type: new GraphQLNonNull(
        new GraphQLList(
          new GraphQLInputObjectType({
            name: "UpdateFatura_ordens_servico",
            fields: {
              uuid: NonNullString,
            },
          })
        )
      ),
    },
  },
  resolve,
};
