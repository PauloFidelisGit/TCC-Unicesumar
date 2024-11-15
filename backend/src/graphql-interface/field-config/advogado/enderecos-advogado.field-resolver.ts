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
import { AdvogadoInputResolverDTO } from "./advogado.resolver-dto.js";

export type EnderecosType = GraphQLFieldResolver<
  Partial<AdvogadoInputResolverDTO>,
  ResolverContext,
  any,
  Promise<Partial<EnderecoOutputResolverDTO>[] | null>
>;

export const enderecosAdvogadoFieldResolver: EnderecosType = async (
  parent,
  _props,
  context,
  info,
) => {
  context.policy
    .addRule(({ requiredAll }) => requiredAll(["searchEndereco"]))
    .executeRules();

  const advogado_uuid = parent.uuid;

  if (advogado_uuid === null) {
    return null;
  } else if (advogado_uuid === undefined) {
    throw new ResolverError(
      "O campo 'uuid' é obrigatório se o campo 'enderecos' estiver selecionado.",
    );
  }

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof EnderecoRepositoryDTO)[]>(
    extractFields?.["searchAdvogado"]?.["enderecos"] ||
      extractFields?.["findAdvogado"]?.["enderecos"] ||
      extractFields?.["listAdvogado"]?.["data"]?.["enderecos"],
    {
      allowedFields: enderecoRepositoryColumns,
    },
  );

  const result = await enderecoRepository.search({
    limit: 100,
    where: "advogado_uuid",
    value: advogado_uuid,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível buscar os endereços.", {
      errors: [{ message: result.message }],
    });
  }

  const mappedData = result.value.map(enderecoOutputResolverDTO);

  return mappedData;
};
