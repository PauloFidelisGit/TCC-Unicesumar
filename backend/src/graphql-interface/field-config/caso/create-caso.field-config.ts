import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
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
import {
  PickCasoInputResolverDTO,
  PickCasoOutputResolverDTO,
} from "./caso.resolver-dto.js";

export type CreateCasoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickCasoInputResolverDTO<{
    criado_em: Datetime<string>["toDateTime"];
    titulo: string;
    descricao?: string | null;
    data_abertura?: string;
    data_encerramento?: string | null;
    criado_por_advogado_uuid: string;
  }>,
  Promise<
    PickCasoOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateCasoType = async (_parent, props, context, _info) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createCaso"]))
    .executeRules();
  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      titulo: x.string({ label: "titulo" }),
      descricao: x.string({ label: "descricao" }).nullish(),
      data_abertura: x.toISOStringLocal({ label: "data_abertura" }),
      data_encerramento: x
        .toISOStringLocal({ label: "data_encerramento" })
        .nullish(),
      criado_por_advogado_uuid: x.uuid({ label: "criado_por_advogado_uuid" }),
    })
    .parse(props);

  const entity: PickCaso<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    titulo: string;
    descricao?: string | null;
    data_abertura: Datetime<string>;
    data_encerramento?: Datetime<string | undefined | null>;
    criado_por_advogado_uuid: Uuid<string>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    titulo: data.titulo,
    descricao: data.descricao,
    data_abertura: Datetime.createOrNew(data.data_abertura),
    data_encerramento: new Datetime(data.data_encerramento),
    criado_por_advogado_uuid: new Uuid(data.criado_por_advogado_uuid),
  };

  const result = await casoRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    titulo: entity.titulo,
    descricao: entity.descricao,
    data_abertura: entity.data_abertura.toDatabaseTimeStamp,
    data_encerramento: entity.data_encerramento?.toDatabaseTimeStamp,
    criado_por_advogado_uuid: entity.criado_por_advogado_uuid.value,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível criar o caso.", {
      errors: [{ message: result.message }],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createCaso: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "CreateCaso",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    titulo: NonNullString,
    descricao: String,
    data_abertura: NonNullString,
    data_encerramento: String,
    criado_por_advogado_uuid: NonNullString,
  },
  resolve,
};
