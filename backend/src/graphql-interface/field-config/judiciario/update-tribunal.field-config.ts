import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickTribunal } from "../../../domain/entities/tribunal.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { tribunalRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickTribunalInputResolverDTO } from "./tribunal.resolver-dto.js";

export type UpdateTribunalType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickTribunalInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      nome: string;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateTribunalType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateTribunal"]))
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

  const entity: PickTribunal<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    nome: string;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    nome: data.data.nome,
  };
  const result = await tribunalRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      nome: data.data.nome,
    },
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar o tribunal.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateTribunal: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateTribunal_data",
        fields: {
          atualizado_em: String,
          nome: String,
        },
      }),
    },
  },
  resolve,
};
