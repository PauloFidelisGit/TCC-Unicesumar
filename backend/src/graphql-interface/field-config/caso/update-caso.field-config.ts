import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
} from "graphql";
import { z } from "zod";
import { PickCaso } from "../../../domain/entities/caso.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { casoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { PickCasoInputResolverDTO } from "./caso.resolver-dto.js";

export type UpdateCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    uuid: string;
    data: PickCasoInputResolverDTO<{
      atualizado_em: Datetime<string>["toDateTime"];
      titulo?: string;
      descricao?: string | null;
      data_abertura?: string;
      data_encerramento?: string | null;
    }>;
  },
  Promise<boolean>
>;

const resolve: UpdateCasoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["updateCaso"]))
    .executeRules();

  const data = z
    .object({
      uuid: x.uuid({ label: "uuid" }),
      data: z.object({
        atualizado_em: x.dateISOString({ label: "atualizado_em" }),
        titulo: x.string({ label: "titulo" }),
        descricao: x.string({ label: "descricao" }).nullish(),
        data_abertura: x
          .toISOStringLocal({ label: "data_abertura" })
          .optional(),
        data_encerramento: x
          .toISOStringLocal({ label: "data_encerramento" })
          .nullable()
          .optional(),
      }),
    })
    .parse(props);

  const entity: PickCaso<{
    uuid: Uuid<string>;
    atualizado_em: Datetime<string>;
    titulo?: string;
    descricao?: string | null;
    data_abertura?: Datetime<string | undefined>;
    data_encerramento?: Datetime<string | undefined | null>;
  }> = {
    uuid: new Uuid(data.uuid),
    atualizado_em: new Datetime(data.data.atualizado_em),
    titulo: data.data.titulo,
    descricao: data.data.descricao,
    data_abertura: new Datetime(data.data.data_abertura),
    data_encerramento: new Datetime(data.data.data_encerramento),
  };

  const result = await casoRepository.update({
    uuid: data.uuid,
    data: {
      atualizado_em: entity.atualizado_em.toDatabaseTimeStamp,
      titulo: entity.titulo,
      descricao: entity.descricao,
      data_abertura: entity.data_abertura?.toDatabaseTimeStamp,
      data_encerramento: entity.data_encerramento?.toDatabaseTimeStamp,
    },
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível atualizar o caso.", {
      errors: [{ message: result.message }],
    });
  }
  return true;
};

export const updateCaso: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    uuid: NonNullString,
    data: {
      type: new GraphQLInputObjectType({
        name: "updateCaso_data",
        fields: {
          atualizado_em: String,
          titulo: String,
          descricao: String,
          data_abertura: NonNullString,
          data_encerramento: String,
        },
      }),
    },
  },
  resolve,
};
