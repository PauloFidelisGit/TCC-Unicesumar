import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
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
import { NonNullFloat, NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickOrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

export type CreateOrdemServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickOrdemServicoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    descricao?: string | null;
    data_abertura: Datetime<string>["toDateTime"];
    data_conclusao?: Datetime<string | null>["toDateTime"];
    data_cancelamento?: Datetime<string | null>["toDateTime"];
    prazo_conclusao?: Datetime<string | null>["toDateTime"];
    status: STATUS_ORDEM_SERVICO;
    prioridade: PRIORIDADE_ORDEM_SERVICO;
    valor_servico: number;
    criado_por_advogado_uuid: string;
    servico_uuid: string;
    processo_uuid?: string | null;
    caso_uuid?: string | null;
  }>,
  Promise<
    PickOrdemServicoInputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateOrdemServicoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  console.log(
    "🚀 ~ file: create-ordem-servico.field-config.ts:52 ~ props:",
    props,
  );

  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createOrdemServico"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      descricao: x.string({ label: "descricao" }).optional(),
      data_abertura: x.dateISOString({ label: "data_abertura" }),
      data_conclusao: x.dateISOString({ label: "data_conclusao" }).optional(),
      data_cancelamento: x
        .dateISOString({ label: "data_cancelamento" })
        .optional(),
      prazo_conclusao: x.dateISOString({ label: "prazo_conclusao" }).optional(),
      status: x.nativeEnum({ label: "status" }, STATUS_ORDEM_SERVICO),
      prioridade: x.nativeEnum(
        { label: "prioridade" },
        PRIORIDADE_ORDEM_SERVICO,
      ),
      valor_servico: x.float({ label: "valor_servico" }),
      criado_por_advogado_uuid: x
        .string({ label: "criado_por_advogado_uuid" })
        .uuid(),
      servico_uuid: x.uuid({ label: "servico_uuid" }),
      processo_uuid: x.uuid({ label: "processo_uuid" }).nullish(),
      caso_uuid: x.uuid({ label: "caso_uuid" }).nullish(),
    })
    .superRefine((data, ctx) => {
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
    criado_em: Datetime<string>;
    descricao?: string | null;
    data_abertura: Datetime<string>;
    data_conclusao?: Datetime<string | undefined | null>;
    data_cancelamento?: Datetime<string | undefined | null>;
    prazo_conclusao?: Datetime<string | undefined | null>;
    status: STATUS_ORDEM_SERVICO;
    prioridade: PRIORIDADE_ORDEM_SERVICO;
    valor_servico: FloatValue<number>;
    criado_por_advogado_uuid: Uuid<string>;
    servico_uuid: Uuid<string>;
    processo_uuid?: Uuid<string | undefined | null>;
    caso_uuid?: Uuid<string | undefined | null>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    descricao: data.descricao,
    data_abertura: new Datetime(props.data_abertura),
    data_conclusao: new Datetime(props.data_conclusao),
    data_cancelamento: new Datetime(props.data_cancelamento),
    prazo_conclusao: new Datetime(props.prazo_conclusao),
    status: data.status,
    prioridade: data.prioridade,
    valor_servico: new FloatValue(data.valor_servico),
    criado_por_advogado_uuid: new Uuid(data.criado_por_advogado_uuid),
    servico_uuid: new Uuid(data.servico_uuid),
    processo_uuid: new Uuid(data.processo_uuid),
    caso_uuid: new Uuid(data.caso_uuid),
  };

  const result = await ordemServicoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    descricao: entity.descricao,
    data_abertura: entity.data_abertura.toDatabaseTimeStamp,
    data_conclusao: entity.data_conclusao?.toDatabaseTimeStamp,
    data_cancelamento: entity.data_cancelamento?.toDatabaseTimeStamp,
    prazo_conclusao: entity.prazo_conclusao?.toDatabaseTimeStamp,
    status: entity.status,
    prioridade: entity.prioridade,
    valor_servico: entity.valor_servico.value,
    criado_por_advogado_uuid: entity.criado_por_advogado_uuid.value,
    servico_uuid: entity.servico_uuid.value,
    processo_uuid: entity.processo_uuid?.value,
    caso_uuid: entity.caso_uuid?.value,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível criar a ordem de serviço.", {
      errors: [{ message: result.message }],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createOrdemServico: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateOrdemServico",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    descricao: String,
    data_abertura: NonNullString,
    data_conclusao: String,
    data_cancelamento: String,
    prazo_conclusao: String,
    status: NonNullString,
    prioridade: NonNullString,
    valor_servico: NonNullFloat,
    criado_por_advogado_uuid: NonNullString,
    servico_uuid: NonNullString,
    processo_uuid: String,
    caso_uuid: String,
  },
  resolve,
};
