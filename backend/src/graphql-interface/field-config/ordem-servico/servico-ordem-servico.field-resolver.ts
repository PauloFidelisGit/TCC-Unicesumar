import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  servicoRepositoryColumns,
  ServicoRepositoryDTO,
} from "../../../domain/repositories/servico.repository-abstract.js";
import { servicoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  servicoOutputResolverDTO,
  ServicoOutputResolverDTO,
} from "../servico/servico.resolver-dto.js";
import { OrdemServicoInputResolverDTO } from "./ordem-servico.resolver-dto.js";

type ServicoOrdemServicoFieldResolverType = GraphQLFieldResolver<
  Partial<OrdemServicoInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<ServicoOutputResolverDTO> | null>
>;

export const servicoOrdemServicoFieldResolver: ServicoOrdemServicoFieldResolverType =
  async (parent, _props, _context, info) => {
    const servico_uuid = parent.servico_uuid;

    if (servico_uuid === null) {
      return null;
    } else if (servico_uuid === undefined) {
      throw new ResolverError(
        "O campo 'servico_uuid' é obrigatório se o campo 'servico' estiver selecionado.",
      );
    }

    const fields = new HandleFields(info);
    const extractFields = fields.extract();

    const fieldsKeys = fields.toStringArray<(keyof ServicoRepositoryDTO)[]>(
      extractFields?.["findOrdemServico"]?.servico ||
        extractFields?.["searchOrdemServico"]?.servico ||
        extractFields?.["listOrdemServico"]?.data?.servico,
      {
        allowedFields: servicoRepositoryColumns,
      },
    );

    const data = z
      .object({
        where: x.enum({ label: "where" }, servicoRepositoryColumns),
        value: x
          .string({ label: "value", min: 0 })
          .or(x.number({ label: "value" })),
      })
      .parse({
        where: "uuid",
        value: servico_uuid,
      });

    const result = await servicoRepository.find({
      ...data,
      fields: fieldsKeys,
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar o serviço.", {
        errors: [{ message: result.message }],
      });
    }

    return servicoOutputResolverDTO(result.value);
  };
