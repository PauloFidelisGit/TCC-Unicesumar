import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickServico } from "../../../domain/entities/servico.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { servicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickServicoInputResolverDTO } from "./servico.resolver-dto.js";

export type UpdateServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickServicoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      nome: string;
    }>;
  },
  Promise<any>
>;

const resolve: UpdateServicoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateServico"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        nome: x.string({ label: "nome" }),
      }),
    })
    .parse(props);

  const entity: PickServico<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    nome: string;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    nome: data.data.nome,
  };

  const result = await servicoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      nome: entity.nome,
    },
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateServico: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "UpdateServico_data",
        fields: {
          atualizado_em: NonNullString,
          nome: String,
        },
      }),
    },
  },
  resolve,
};
