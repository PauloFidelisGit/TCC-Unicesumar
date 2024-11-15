import { GraphQLFieldResolver } from "graphql";
import {
  parcelaFaturaRepositoryColumns,
  ParcelaFaturaRepositoryDTO,
} from "../../../domain/repositories/parcela-fatura.repository-abstract.js";
import { parcelaFaturaRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  FaturaInputResolverDTO,
  FaturaOutputResolverDTO,
} from "./fatura.resolver-dto.js";
import { parcelaFaturaOutputResolverDTO } from "./parcela-fatura.resolver.dto.js";

type FieldResolverType = GraphQLFieldResolver<
  Partial<FaturaInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<FaturaOutputResolverDTO>[] | null>
>;

export const parcelasFaturaFieldResolver: FieldResolverType = async (
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
      "O campo 'uuid' é obrigatório se o campo 'parcelas' estiver selecionado.",
    );
  }

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof ParcelaFaturaRepositoryDTO)[]>(
    extractFields?.["findFatura"]?.parcelas ||
      extractFields?.["searchFatura"]?.parcelas ||
      extractFields?.["listFatura"]?.data?.parcelas,
    {
      allowedFields: parcelaFaturaRepositoryColumns,
    },
  );

  if (!fieldsKeys.includes("data_vencimento")) {
    fieldsKeys.push("data_vencimento");
  }

  const result = await parcelaFaturaRepository.search({
    fields: fieldsKeys,
    where: "fatura_uuid",
    limit: 1000,
    value: fatura_uuid,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar as parcelas.", {
      errors: [{ message: result.message }],
    });
  }

  return result.value.map(parcelaFaturaOutputResolverDTO).sort((a, b) => {
    if (a.data_vencimento! < b.data_vencimento!) {
      return -1;
    } else if (a.data_vencimento! > b.data_vencimento!) {
      return 1;
    } else {
      return 0;
    }
  });
};
