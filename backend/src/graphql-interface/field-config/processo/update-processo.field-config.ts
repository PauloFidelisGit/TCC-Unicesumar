import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLFloat,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickProcessoInputResolverDTO } from "./processo.resolver-dto.js";

export type UpdateProcessoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickProcessoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      numero?: string;
      data_autuacao?: string | null;
      valor_causa?: number | null;
      segredo_justica?: boolean | null;
      tutela_urgencia?: boolean | null;
      orgao_uuid?: string;
      classe_judicial_uuid?: string | null;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateProcessoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateProcesso"]))
    .executeRules();

  const data = z

    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        numero: x.string({ label: "numero", length: 20 }).optional(),
        data_autuacao: x.dateISO8601({ label: "data_autuacao" }).nullish(),
        valor_causa: x.number({ label: "valor_causa" }).nullable(),
        segredo_justica: x.boolean({ label: "segredo_justica" }).nullish(),
        tutela_urgencia: x.boolean({ label: "tutela_urgencia" }).nullish(),
        orgao_uuid: x.uuid({ label: "orgao_uuid" }).nullish(),
        classe_judicial_uuid: x
          .uuid({ label: "classe_judicial_uuid" })
          .nullish(),
      }),
    })
    .parse(props);

  const entity = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    numero: data.data.numero,
    data_autuacao: new Datetime(data.data.data_autuacao),
    valor_causa: data.data.valor_causa,
    segredo_justica: data.data.segredo_justica,
    tutela_urgencia: data.data.tutela_urgencia,
    orgao_uuid: new Uuid(data.data.orgao_uuid),
    classe_judicial_uuid: new Uuid(data.data.classe_judicial_uuid),
  };

  const result = await processoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      numero: entity.numero,
      data_autuacao: entity.data_autuacao?.toDatabaseTimeStamp,
      valor_causa: entity.valor_causa,
      segredo_justica: entity.segredo_justica,
      tutela_urgencia: entity.tutela_urgencia,
      orgao_uuid: entity.orgao_uuid?.value,
      classe_judicial_uuid: entity.classe_judicial_uuid?.value,
    },
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar o processo.", {
      errors: [{ message: result.message }],
    });
  }

  return true;
};

export const updateProcesso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateProcesso_data",
        fields: {
          atualizado_em: String,
          numero: String,
          data_autuacao: String,
          valor_causa: { type: GraphQLFloat },
          segredo_justica: { type: GraphQLBoolean },
          tutela_urgencia: { type: GraphQLBoolean },
          orgao_uuid: String,
          classe_judicial_uuid: String,
          advogado_uuid: String,
        },
      }),
    },
  },
  resolve,
};
