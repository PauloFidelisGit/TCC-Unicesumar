import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  processoRepositoryColumns,
  ProcessoRepositoryDTO,
} from "../../../domain/repositories/processo.repository-abstract.js";
import { processoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ProcessoOutputResolverDTO,
  processoOutputResolverDTO,
} from "../processo/processo.resolver-dto.js";
import { OrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

type ProcessoFieldResolverType = GraphQLFieldResolver<
  Partial<OrdemServicoInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<ProcessoOutputResolverDTO> | null>
>;

export const processoOrdemServicoFieldResolver: ProcessoFieldResolverType =
  async (parent, _props, _context, info) => {
    const processo_uuid = parent.processo_uuid;

    if (processo_uuid === null) {
      return null;
    } else if (processo_uuid === undefined) {
      throw new ResolverError(
        "O campo 'processo_uuid' é obrigatório se o campo 'processo' estiver selecionado.",
      );
    }

    const fields = new HandleFields(info);
    const extractFields = fields.extract();

    const fieldsKeys = fields.toStringArray<(keyof ProcessoRepositoryDTO)[]>(
      extractFields?.["findOrdemServico"]?.processo ||
        extractFields?.["searchOrdemServico"]?.processo ||
        extractFields?.["listOrdemServico"]?.data?.processo,
      {
        allowedFields: processoRepositoryColumns,
      },
    );

    const data = z
      .object({
        where: x.enum({ label: "where" }, processoRepositoryColumns),
        value: x
          .string({ label: "value", min: 0 })
          .or(x.number({ label: "value" })),
      })
      .parse({
        where: "uuid",
        value: processo_uuid,
      });

    const result = await processoRepository.find({
      ...data,
      fields: fieldsKeys,
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar a processo.", {
        errors: [{ message: result.message }],
      });
    }

    return processoOutputResolverDTO(result.value);
  };
