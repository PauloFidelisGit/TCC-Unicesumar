import { GraphQLFieldResolver } from "graphql";
import {
  enderecoRepositoryColumns,
  EnderecoRepositoryDTO,
} from "../../../domain/repositories/endereco.repository-abstract.js";
import { enderecoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  EnderecoOutputResolverDTO,
  enderecoOutputResolverDTO,
} from "../endereco/endereco.resolver-dto.js";
import { PessoaOutputResolverDTO } from "./pessoa.resolver-dto.js";

export type EnderecosPessoaFieldresolverType = GraphQLFieldResolver<
  Partial<PessoaOutputResolverDTO>,
  ResolverContext,
  any,
  Promise<Partial<EnderecoOutputResolverDTO>[] | null>
>;

export const enderecosPessoaFieldResolver: EnderecosPessoaFieldresolverType =
  async (parent, _props, context, info) => {
    context.policy
      .addRule(({ requiredAll }) => requiredAll(["searchEndereco"]))
      .executeRules();
    const fields = new HandleFields(info);
    const extractFields = fields.extract();
    const fieldsKeys = fields.toStringArray<(keyof EnderecoRepositoryDTO)[]>(
      extractFields["findPessoa"]?.enderecos ||
        extractFields["searchPessoa"]?.enderecos ||
        extractFields["listPessoa"]?.enderecos,
      {
        allowedFields: enderecoRepositoryColumns,
      },
    );

    const pessoa_uuid = parent.uuid;
    if (!pessoa_uuid) return null;

    const result = await enderecoRepository.search({
      limit: 100,
      where: "pessoa_uuid",
      value: pessoa_uuid,
      fields: fieldsKeys,
    });
    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar os endereços.", {
        errors: [{ message: result.message }],
      });
    }

    const mappedData = result.value.map(enderecoOutputResolverDTO);

    return mappedData;
  };
