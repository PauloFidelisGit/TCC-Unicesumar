import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickClasseJudicial } from "../../../domain/entities/classe-judicial.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";

import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickClasseJudicialInputResolverDTO,
  PickClasseJudicialOutputResolverDTO,
} from "./classe-judicial.resolver-dto.js";

export type CreateClasseJudicialType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickClasseJudicialInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    nome: string;
    codigo: string;
  }>,
  Promise<
    PickClasseJudicialOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateClasseJudicialType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createClasseJudicial"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      nome: x.string({ label: "nome" }),
      codigo: x.string({ label: "codigo" }),
    })
    .parse(props);

  const entity: PickClasseJudicial<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    nome: string;
    codigo: string;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    nome: data.nome,
    codigo: data.codigo,
  };

  const result = await classeJudicialRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    nome: entity.nome,
    codigo: entity.codigo,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível criar a classe judicial.", {
      errors: [{ message: result.message }],
    });
  }

  return {
    uuid: result.value.uuid,
  };
};

export const createClasseJudicial: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateClasseJudicial",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    nome: NonNullString,
    codigo: NonNullString,
  },
  resolve,
};
