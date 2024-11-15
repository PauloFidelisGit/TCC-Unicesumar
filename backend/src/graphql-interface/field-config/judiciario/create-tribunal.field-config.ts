import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickTribunal } from "../../../domain/entities/tribunal.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { tribunalRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickTribunalInputResolverDTO,
  PickTribunalOutputResolverDTO,
} from "./tribunal.resolver-dto.js";

export type CreateTribunalType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickTribunalInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    nome: string;
  }>,
  Promise<
    PickTribunalOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateTribunalType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createTribunal"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      nome: x.string({ label: "nome" }),
    })
    .parse(props);

  const entity: PickTribunal<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    nome: string;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    nome: data.nome,
  };

  const result = await tribunalRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    nome: entity.nome,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível criar o tribunal.", {
      errors: [{ message: result.message }],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createTribunal: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateTribunal",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    nome: NonNullString,
  },
  resolve,
};
