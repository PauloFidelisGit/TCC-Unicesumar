import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  faturaRepositoryColumns,
  FaturaRepositoryDTO,
} from "../../../domain/repositories/fatura.repository-abstract.js";
import { faturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  faturaOutputResolverDTO,
  FaturaOutputResolverDTO,
} from "../fatura/fatura.resolver-dto.js";
import { OrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

type FaturaFieldResolverType = GraphQLFieldResolver<
  Partial<OrdemServicoInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<FaturaOutputResolverDTO> | null>
>;

export const faturaOrdemServicoFieldResolver: FaturaFieldResolverType = async (
  parent,
  _props,
  _context,
  info,
) => {
  const fatura_uuid = parent.fatura_uuid;
  if (!fatura_uuid) return null;

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof FaturaRepositoryDTO)[]>(
    extractFields?.["findFatura"]?.fatura ||
      extractFields?.["searchFatura"]?.fatura ||
      extractFields?.["listFatura"]?.data?.fatura,
    {
      allowedFields: faturaRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, faturaRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse({
      where: "uuid",
      value: fatura_uuid,
    });

  const result = await faturaRepository.find({
    ...data,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar a fatura.", {
      errors: [{ message: result.message }],
    });
  }

  return faturaOutputResolverDTO(result.value);
};
