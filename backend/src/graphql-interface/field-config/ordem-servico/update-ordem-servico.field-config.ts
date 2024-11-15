import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickOrdemServico } from "../../../domain/entities/ordem-servico.entity.js";
import { PRIORIDADE_ORDEM_SERVICO } from "../../../domain/enums/PRIORIDADE_ORDEM_SERVICO.js";
import { STATUS_ORDEM_SERVICO } from "../../../domain/enums/STATUS_ORDEM_SERVICO.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { FloatValue } from "../../../domain/vo/float-value.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { Int, NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickOrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

export type UpdateOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickOrdemServicoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      numero?: number;
      descricao?: string | null;
      data_abertura?: Datetime<string>["toDateTime"];
      data_conclusao?: Datetime<string | null>["toDateTime"];
      data_cancelamento?: Datetime<string | null>["toDateTime"];
      prazo_conclusao?: Datetime<string | null>["toDateTime"];
      status?: STATUS_ORDEM_SERVICO;
      prioridade?: PRIORIDADE_ORDEM_SERVICO;
      valor_servico: FloatValue<number>["value"];
      servico_uuid?: string;
      fatura_uuid?: string | null;
    }>;
  },
  Promise<true>
>;

const resolve: UpdateOrdemServicoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateOrdemServico"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        descricao: x.string({ label: "descricao" }).nullish(),
        data_abertura: x.dateISOString({ label: "data_abertura" }),
        data_conclusao: x.dateISOString({ label: "data_conclusao" }).nullish(),
        data_cancelamento: x
          .dateISOString({ label: "data_cancelamento" })
          .nullable(),
        prazo_conclusao: x
          .dateISOString({ label: "prazo_conclusao" })
          .nullable(),
        status: x.nativeEnum({ label: "status" }, STATUS_ORDEM_SERVICO),
        prioridade: x.nativeEnum(
          { label: "prioridade" },
          PRIORIDADE_ORDEM_SERVICO,
        ),
        valor_servico: x.float({ label: "valor_servico" }),
        servico_uuid: x.uuid({ label: "servico_uuid" }),
        fatura_uuid: x.uuid({ label: "fatura_uuid" }).optional(),
        processo_uuid: x.uuid({ label: "processo_uuid" }).nullish(),
        caso_uuid: x.uuid({ label: "caso_uuid" }).nullish(),
      }),
    })
    .superRefine(({ data }, ctx) => {
      if (!data.processo_uuid && !data.caso_uuid) {
        ctx.addIssue({
          message: "É necessário informar um processo ou um caso.",
          path: ["processo_uuid", "caso_uuid"],
          code: "custom",
        });
      }

      if (
        data?.prazo_conclusao &&
        new Date(data.data_abertura) > new Date(data.prazo_conclusao)
      ) {
        ctx.addIssue({
          message:
            "O prazo de conclusão não pode ser anterior à data de abertura.",
          path: ["prazo_conclusao"],
          code: "custom",
        });
      }

      if (
        data?.data_conclusao &&
        new Date(data.data_abertura) > new Date(data.data_conclusao)
      ) {
        ctx.addIssue({
          message:
            "A data de conclusão não pode ser anterior à data de abertura.",
          path: ["data_conclusao"],
          code: "custom",
        });
      }

      if (
        data?.data_cancelamento &&
        new Date(data.data_abertura) > new Date(data.data_cancelamento)
      ) {
        ctx.addIssue({
          message:
            "A data de cancelamento não pode ser anterior à data de abertura.",
          path: ["data_cancelamento"],
          code: "custom",
        });
      }
    })
    .parse(props);

  const entity: PickOrdemServico<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    descricao?: string | null;
    data_abertura?: Datetime<string | undefined>;
    data_conclusao?: Datetime<string | undefined | null>;
    data_cancelamento?: Datetime<string | undefined | null>;
    prazo_conclusao?: Datetime<string | undefined | null>;
    status?: STATUS_ORDEM_SERVICO;
    prioridade?: PRIORIDADE_ORDEM_SERVICO;
    valor_servico?: FloatValue<number | undefined>;
    servico_uuid?: Uuid<string | undefined>;
    fatura_uuid?: Uuid<string | undefined | null>;
    processo_uuid?: Uuid<string | undefined | null>;
    caso_uuid?: Uuid<string | undefined | null>;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    descricao: data.data.descricao,
    data_abertura: new Datetime(data.data.data_abertura),
    data_conclusao: new Datetime(data.data?.data_conclusao),
    data_cancelamento: new Datetime(data.data?.data_cancelamento),
    prazo_conclusao: new Datetime(data.data?.prazo_conclusao),
    status: data.data.status,
    prioridade: data.data.prioridade,
    valor_servico: new FloatValue(data.data.valor_servico),
    servico_uuid: new Uuid(data.data.servico_uuid),
    fatura_uuid: new Uuid(data.data.fatura_uuid),
    processo_uuid: new Uuid(data.data.processo_uuid),
    caso_uuid: new Uuid(data.data.caso_uuid),
  };

  const result = await ordemServicoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      descricao: entity.descricao,
      data_abertura: entity.data_abertura?.toDatabaseTimeStamp,
      data_conclusao: entity.data_conclusao?.toDatabaseTimeStamp,
      data_cancelamento: entity.data_cancelamento?.toDatabaseTimeStamp,
      prazo_conclusao: entity.prazo_conclusao?.toDatabaseTimeStamp,
      status: entity.status,
      prioridade: entity.prioridade,
      valor_servico: entity.valor_servico?.value,
      servico_uuid: entity.servico_uuid?.value,
      fatura_uuid: entity.fatura_uuid?.value,
      processo_uuid: entity.processo_uuid?.value,
      caso_uuid: entity.caso_uuid?.value,
    },
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar a ordem de serviço.", {
      errors: [{ message: result.message }],
    });
  }

  return true;
};

export const updateOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "UpdateOrdemServico_data",
        fields: {
          atualizado_em: NonNullString,
          descricao: String,
          data_abertura: String,
          data_conclusao: String,
          data_cancelamento: String,
          prazo_conclusao: String,
          status: String,
          prioridade: String,
          valor_servico: Int,
          servico_uuid: String,
          fatura_uuid: String,
          processo_uuid: String,
          caso_uuid: String,
        },
      }),
    },
  },
  resolve,
};
