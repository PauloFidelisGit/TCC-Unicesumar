import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickMunicipio } from "../../../domain/entities/municipio.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { municipioRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickMunicipioInputResolverDTO,
  PickMunicipioOutputResolverDTO,
} from "./municipio.resolver.dto.js";

export type CreateMunicipioType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickMunicipioInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    nome: string;
    codigo: string;
    codigo_uf: string;
  }>,
  Promise<
    PickMunicipioOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateMunicipioType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createMunicipio"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      nome: x.string({ label: "nome" }),
      codigo: x.string({ label: "codigo" }),
      codigo_uf: x.string({ label: "codigo_uf" }),
    })
    .parse(props);

  const entity: PickMunicipio<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    nome: string;
    codigo: string;
    codigo_uf: string;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    nome: data.nome,
    codigo: data.codigo,
    codigo_uf: data.codigo_uf,
  };
  const result = await municipioRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    nome: entity.nome,
    codigo: entity.codigo,
    codigo_uf: entity.codigo_uf,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível criar o municipio.", {
      errors: [{ message: result.message }],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createMunicipio: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateMunicipio",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    nome: NonNullString,
    codigo: NonNullString,
    codigo_uf: NonNullString,
  },
  resolve,
};
