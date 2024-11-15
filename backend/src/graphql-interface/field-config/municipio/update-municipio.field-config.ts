import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickMunicipio } from "../../../domain/entities/municipio.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { municipioRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickMunicipioInputResolverDTO } from "./municipio.resolver.dto.js";

export type UpdateMunicipioType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickMunicipioInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      nome?: string;
      codigo?: string;
      codigo_uf?: string;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateMunicipioType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateMunicipio"]))
    .executeRules();
  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        nome: x.string({ label: "nome" }).optional(),
        codigo: x.string({ label: "codigo" }).optional(),
        codigo_uf: x.string({ label: "codigo_uf" }).optional(),
      }),
    })
    .parse(props);
  const entity: PickMunicipio<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    nome?: string;
    codigo?: string;
    codigo_uf?: string;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    nome: data.data.nome,
    codigo: data.data.codigo,
    codigo_uf: data.data.codigo_uf,
  };
  const result = await municipioRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      nome: entity.nome,
      codigo: entity.codigo,
      codigo_uf: entity.codigo_uf,
    },
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar o municipio.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateMunicipio: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "UpdateMunicipio_data",
        fields: {
          atualizado_em: NonNullString,
          nome: String,
          codigo: String,
          codigo_uf: String,
        },
      }),
    },
  },
  resolve,
};
