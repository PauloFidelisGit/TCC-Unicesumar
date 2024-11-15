import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  pessoaRepositoryColumns,
  PessoaRepositoryDTO,
} from "../../../domain/repositories/pessoa.repository-abstract.js";
import {
  relacionamentoProcessoPessoaRepositoryColumns,
  RelacionamentoProcessoPessoaRepositoryDTO,
} from "../../../domain/repositories/relacionamento-processo-pessoa.repository-abstract.js";
import { relacionamentoProcessoPessoaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  PessoaOutputResolverDTO,
  pessoaOutputResolverDTO,
} from "../pessoa/pessoa.resolver-dto.js";
import { ProcessoInputResolverInputDTO } from "./processo.resolver-dto.js";
import {
  RelacionamentoProcessoPessoaInputResolverDTO,
  relacionamentoProcessoPessoaOutputResolverDTO,
} from "./relacionamento-processo-pessoa.resolver-dto.js";

export type PolosProcessoFieldResolverType = GraphQLFieldResolver<
  Partial<ProcessoInputResolverInputDTO>,
  ResolverContext,
  {
    processo_uuid?: string;
  },
  Promise<
    | (Partial<RelacionamentoProcessoPessoaInputResolverDTO> & {
        pessoa?: Partial<PessoaOutputResolverDTO>;
      })[]
    | null
  >
>;

export const polosProcessoFieldResolver: PolosProcessoFieldResolverType =
  async (parent, props, context, info) => {
    context.policy
      .addRule(({ requiredAll }) => requiredAll(["findPessoa"]))
      .executeRules();

    const fields = new HandleFields(info);
    const extractFields = fields.extract();

    const fieldsKeysPessoa = fields.toStringArray<
      (keyof PessoaRepositoryDTO)[]
    >(fields.findValueByKey(extractFields, "pessoa"), {
      allowedFields: pessoaRepositoryColumns,
    });

    const fieldsKeysRelacionamentoProcessoPessoa = fields.toStringArray<
      (keyof RelacionamentoProcessoPessoaRepositoryDTO)[]
    >(fields.findValueByKey(extractFields, "polos"), {
      allowedFields: relacionamentoProcessoPessoaRepositoryColumns,
    });

    const processo_uuid = parent?.uuid || props.processo_uuid!;
    if (!processo_uuid) return null;

    const data = z
      .object({
        processo_uuid: x.uuid({ label: "uuid" }),
      })
      .parse({
        processo_uuid,
      });

    const result =
      await relacionamentoProcessoPessoaRepository.findPessoasRelatedProcesso({
        fields: {
          pessoa: fieldsKeysPessoa,
          relacionamento_processo: fieldsKeysRelacionamentoProcessoPessoa,
        },
        where: "processo_uuid",
        value: data.processo_uuid,
      });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar os polos.", {
        errors: [{ message: result.message }],
      });
    }

    const mappedData = result.value.map((item) => {
      return {
        ...relacionamentoProcessoPessoaOutputResolverDTO(item),
        ...(item.pessoa && {
          pessoa: pessoaOutputResolverDTO(item.pessoa),
        }),
      };
    });

    return mappedData;
  };
