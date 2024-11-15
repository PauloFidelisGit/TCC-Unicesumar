import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { PickRelacionamentoProcessoPessoa } from "../../../domain/entities/relacionamento-processo-pessoa.entity.js";
import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "../../../domain/enums/TIPO_RELACIONAMENTO_PROCESSO_PESSOA.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { relacionamentoProcessoPessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { sanitizeErrorRelacionamentoProcessoPessoa } from "./processo.sanitize-error.js";
import {
  PickRelacionamentoProcessoPessoaInputResolverDTO,
  PickRelacionamentoProcessoPessoaOutputResolverDTO,
} from "./relacionamento-processo-pessoa.resolver-dto.js";

export type CreateRelacionamentoProcessoPessoaType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickRelacionamentoProcessoPessoaInputResolverDTO<{
    criado_em: string;
    processo_uuid: string;
    pessoa_uuid: string;
    tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
  }>,
  Promise<
    PickRelacionamentoProcessoPessoaOutputResolverDTO<{
      uuid: string;
    }>
  >
>;
const resolve: CreateRelacionamentoProcessoPessoaType = async (
  _parent,
  props,
  context,
  _info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["createRelacionamentoProcesso"]))
    .executeRules();

  const data = z
    .object({
      criado_em: x.dateISOString({ label: "criado_em" }),
      processo_uuid: x.uuid({ label: "processo_uuid" }),
      pessoa_uuid: x.uuid({ label: "pessoa_uuid" }),
      tipo_relacionamento: x.nativeEnum(
        { label: "tipo_relacionamento" },
        TIPO_RELACIONAMENTO_PROCESSO_PESSOA,
      ),
    })
    .parse(props);

  const entity: PickRelacionamentoProcessoPessoa<{
    uuid: Uuid<string>;
    criado_em: Datetime<string>;
    processo_uuid: Uuid<string>;
    pessoa_uuid: Uuid<string>;
    tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
  }> = {
    uuid: Uuid.create(),
    criado_em: new Datetime(data.criado_em),
    processo_uuid: new Uuid(data.processo_uuid),
    pessoa_uuid: new Uuid(data.pessoa_uuid),
    tipo_relacionamento: data.tipo_relacionamento,
  };
  const result = await relacionamentoProcessoPessoaRepository.save({
    uuid: entity.uuid.value,
    criado_em: entity.criado_em.toDatabaseTimeStamp,
    processo_uuid: entity.processo_uuid.value,
    pessoa_uuid: entity.pessoa_uuid?.value,
    tipo_relacionamento: entity.tipo_relacionamento,
  });

  if (!result.success) {
    let error = sanitizeErrorRelacionamentoProcessoPessoa(result);
    throw new ResolverError("Não foi possível criar o relacionameto.", {
      errors: [{ message: error.message }],
    });
  }
  return {
    uuid: result.value.uuid,
  };
};

export const createRelacionamentoProcessoPessoa: GraphQLFieldConfig<
  any,
  any,
  any
> = {
  type: new GraphQLObjectType({
    name: "CreateRelacionamentoProcesso",
    fields: {
      uuid: NonNullString,
    },
  }),
  args: {
    criado_em: NonNullString,
    processo_uuid: NonNullString,
    pessoa_uuid: NonNullString,
    tipo_relacionamento: NonNullString,
  },
  resolve,
};
