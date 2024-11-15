import { GraphQLFieldResolver } from "graphql";
import {
  casoRepositoryColumns,
  CasoRepositoryDTO,
} from "../../../domain/repositories/caso.repository-abstract.js";
import { casoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  casoOutputResolverDTO,
  CasoOutputResolverDTO,
} from "../caso/caso.resolver-dto.js";
import { OrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

type FieldResolverType = GraphQLFieldResolver<
  Partial<OrdemServicoInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<CasoOutputResolverDTO> | null>
>;

export const casoOrdemServicoFieldResolver: FieldResolverType = async (
  parent,
  _props,
  _context,
  info,
) => {
  const caso_uuid = parent.caso_uuid;

  if (caso_uuid === null) {
    return null;
  } else if (caso_uuid === undefined) {
    throw new ResolverError(
      "O campo 'caso_uuid' é obrigatório se o campo 'caso' estiver selecionado.",
    );
  }

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof CasoRepositoryDTO)[]>(
    extractFields?.["findOrdemServico"]?.caso ||
      extractFields?.["searchOrdemServico"]?.caso ||
      extractFields?.["listOrdemServico"]?.data?.caso,
    {
      allowedFields: casoRepositoryColumns,
    },
  );

  const result = await casoRepository.find({
    fields: fieldsKeys,
    where: "uuid",
    value: caso_uuid,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar o caso.", {
      errors: [{ message: result.message }],
    });
  }

  return casoOutputResolverDTO(result.value);
};
