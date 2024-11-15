import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickRelacionamentoCasoPessoa } from "../../../domain/entities/relacionamento-caso-pessoa.entity.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { relacionamentoCasoPessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString, String } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickRelacionamentoCasoPessoaInputResolverDTO,
  PickRelacionamentoCasoPessoaOutputResolverDTO,
} from "./relacionamento-caso-pessoa.resolver-dto.js";

export type CreateRelacionamentoCasoPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickRelacionamentoCasoPessoaInputResolverDTO<{
    criado_em: string;
    caso_uuid: string;
    pessoa_uuid: string;
  }>,
  Promise<
    PickRelacionamentoCasoPessoaOutputResolverDTO<{
      uuid: string;
    }>
  >
>;

const resolve: CreateRelacionamentoCasoPessoaType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) =>
      requiredAll(["createRelacionamentoCasoPessoa"]),
    )
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      caso_uuid: x.uuid({ label: "caso_uuid" }),
      pessoa_uuid: x.uuid({ label: "pessoa_uuid" }),
    })
    .parse(props);

  const entity: PickRelacionamentoCasoPessoa<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    caso_uuid: Uuid<string>;
    pessoa_uuid: Uuid<string>;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    caso_uuid: new Uuid(data.caso_uuid),
    pessoa_uuid: new Uuid(data.pessoa_uuid),
  };
  const result = await relacionamentoCasoPessoaRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    caso_uuid: entity.caso_uuid.value,
    pessoa_uuid: entity.pessoa_uuid?.value,
  });
  if (!result.success) {
    throw new ResolverError("Não foi possível criar o relacionamento.", {
      errors: [{ message: result.message }],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createRelacionamentoCasoPessoa: GraphQLFieldConfig<any, any, any> =
  {
    type: new GraphQLObjectType({
      name: "CreateRelacionamentoCasoPessoa",
      fields: {
        uuid: NonNullString,
      },
    }),
    args: {
      criado_em: NonNullString,
      caso_uuid: NonNullString,
      pessoa_uuid: String,
    },
    resolve,
  };
