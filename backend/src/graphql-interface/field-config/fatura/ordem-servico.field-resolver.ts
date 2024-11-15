import { GraphQLFieldResolver } from "graphql";
import {
  ordemServicoRepositoryColumns,
  OrdemServicoRepositoryDTO,
} from "../../../domain/repositories/ordem-servico.repository-abstract.js";
import { ordemServicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ordemServicoOutputResolverDTO,
  OrdemServicoOutputResolverDTO,
} from "../ordem-servico/ordem-servico.resolver-dto.js";
import { FaturaInputResolverDTO } from "./fatura.resolver-dto.js";

type FieldResolverType = GraphQLFieldResolver<
  Partial<FaturaInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<OrdemServicoOutputResolverDTO>[] | null>
>;

export const ordemServicoFieldResolver: FieldResolverType = async (
  parent,
  _props,
  _context,
  info,
) => {
  const fatura_uuid = parent.uuid;

  if (fatura_uuid === null) {
    return null;
  } else if (fatura_uuid === undefined) {
    throw new ResolverError(
      "O campo 'uuid' é obrigatório se o campo 'ordens_servico' estiver selecionado.",
    );
  }

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof OrdemServicoRepositoryDTO)[]>(
    extractFields?.["findFatura"]?.ordens_servico ||
      extractFields?.["searchFatura"]?.ordens_servico ||
      extractFields?.["listFatura"]?.data?.ordens_servico,
    {
      allowedFields: ordemServicoRepositoryColumns,
    },
  );

  const result = await ordemServicoRepository.search({
    fields: fieldsKeys,
    where: "fatura_uuid",
    value: fatura_uuid,
    limit: 1000,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a ordem de serviço.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(ordemServicoOutputResolverDTO);
};
