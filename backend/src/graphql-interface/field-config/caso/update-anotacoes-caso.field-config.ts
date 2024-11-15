import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickAnotacoesCaso } from "../../../domain/entities/anotacoes-caso.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { anotacoesCasoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickAnotacoesCasoInputResolverDTO } from "./anotacoes-caso.resolver-dto.js";

export type UpdateAnotacoesCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickAnotacoesCasoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      titulo: string;
      descricao?: string | null;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateAnotacoesCasoType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateAnotacoesCaso"]))
    .executeRules();
  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        titulo: x.string({ label: "titulo" }).optional(),
        descricao: x.string({ label: "descricao" }).nullish(),
      }),
    })
    .parse(props);

  const entity: PickAnotacoesCaso<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    titulo?: string;
    descricao?: string | null;
    criado_por_advogado_uuid?: Uuid<string | undefined>;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    titulo: data.data.titulo,
    descricao: data.data.descricao,
  };

  const result = await anotacoesCasoRepository.update({
    uuid: entity.uuid.value,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      titulo: entity.titulo,
      descricao: entity.descricao,
      criado_por_advogado_uuid: entity.criado_por_advogado_uuid?.value,
    },
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar a anotação.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateAnotacoesCaso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateAnotacoesCaso_data",
        fields: {
          atualizado_em: String,
          titulo: String,
          descricao: String,
          criado_por_advogado_uuid: String,
        },
      }),
    },
  },
  resolve,
};
