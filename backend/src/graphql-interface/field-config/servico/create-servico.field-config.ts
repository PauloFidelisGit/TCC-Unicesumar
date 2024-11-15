import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickServico } from "../../../domain/entities/servico.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { servicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickServicoInputResolverDTO,
  PickServicoOutputResolverDTO,
} from "./servico.resolver-dto.js";

export type CreateServicoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickServicoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    nome: string;
  }>,
  Promise<
    PickServicoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateServicoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createServico"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      nome: x.string({ label: "nome" }),
    })
    .parse(props);

  const entity: PickServico<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    nome: string;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    nome: data.nome,
  };

  const result = await servicoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    nome: entity.nome,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível criar o serviço.", {
      errors: [result],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createServico: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateServico",
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
