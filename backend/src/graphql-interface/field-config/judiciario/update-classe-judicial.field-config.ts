import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickClasseJudicial } from "../../../domain/entities/classe-judicial.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickClasseJudicialInputResolverDTO } from "./classe-judicial.resolver-dto.js";

export type UpdateClasseJudicialType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickClasseJudicialInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      nome?: string;
      codigo?: string;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateClasseJudicialType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateClasseJudicial"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        nome: x.string({ label: "nome" }).optional(),
        codigo: x.string({ label: "codigo" }).optional(),
      }),
    })
    .parse(props);

  const entity: PickClasseJudicial<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    nome?: string;
    codigo?: string;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    nome: data.data.nome,
    codigo: data.data.codigo,
  };

  const result = await classeJudicialRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      nome: entity.nome,
      codigo: entity.codigo,
    },
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar a classe judicial.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateClasseJudicial: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateClasseJudicial_data",
        fields: {
          atualizado_em: String,
          nome: String,
          codigo: String,
        },
      }),
    },
  },
  resolve,
};
