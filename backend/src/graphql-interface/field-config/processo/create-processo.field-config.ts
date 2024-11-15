import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLFloat,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickProcessoInputResolverDTO,
  PickProcessoOutputResolverDTO,
} from "./processo.resolver-dto.js";
import { sanitizeErrorProcesso } from "./processo.sanitize-error.js";

export type CreateProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickProcessoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    numero: string;
    data_autuacao?: string | null;
    valor_causa?: number | null;
    segredo_justica?: boolean | null;
    tutela_urgencia?: boolean | null;
    criado_por_advogado_uuid: string;
    orgao_uuid: string;
    classe_judicial_uuid?: string | null;
  }>,
  Promise<
    PickProcessoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateProcessoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createProcesso"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      numero: x.string({ label: "numero", length: 20 }),
      data_autuacao: x.dateISO8601({ label: "data_autuacao" }).nullish(),
      valor_causa: x.number({ label: "valor_causa" }).nullable(),
      segredo_justica: x.boolean({ label: "segredo_justica" }).nullish(),
      tutela_urgencia: x.boolean({ label: "tutela_urgencia" }).nullish(),
      criado_por_advogado_uuid: x.uuid({ label: "advogado_uuid" }),
      orgao_uuid: x.uuid({ label: "orgao_uuid" }).nullish(),
      classe_judicial_uuid: x.uuid({ label: "classe_judicial_uuid" }).nullish(),
    })
    .parse(props);

  const entity = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    numero: data.numero,
    data_autuacao: new Datetime(data.data_autuacao),
    valor_causa: data.valor_causa,
    segredo_justica: data.segredo_justica,
    tutela_urgencia: data.tutela_urgencia,
    criado_por_advogado_uuid: new Uuid(data.criado_por_advogado_uuid),
    orgao_uuid: new Uuid(data.orgao_uuid),
    classe_judicial_uuid: new Uuid(data.classe_judicial_uuid),
  };

  const result = await processoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    numero: entity.numero,
    data_autuacao: entity.data_autuacao?.toDatabaseTimeStamp,
    valor_causa: entity.valor_causa,
    segredo_justica: entity.segredo_justica,
    tutela_urgencia: entity.tutela_urgencia,
    criado_por_advogado_uuid: entity.criado_por_advogado_uuid.value,
    orgao_uuid: entity.orgao_uuid?.value,
    classe_judicial_uuid: entity.classe_judicial_uuid?.value,
  });

  if (!result.success) {
    const messages = sanitizeErrorProcesso(result);
    throw new ResolverError("Não foi possível criar o processo.", {
      errors: [messages],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createProcesso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateProcesso",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    numero: NonNullString,
    data_autuacao: String,
    valor_causa: { type: GraphQLFloat },
    segredo_justica: { type: GraphQLBoolean },
    tutela_urgencia: { type: GraphQLBoolean },
    criado_por_advogado_uuid: NonNullString,
    orgao_uuid: String,
    classe_judicial_uuid: String,
  },
  resolve,
};
