import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  advogadoRepositoryColumns,
  AdvogadoRepositoryDTO,
} from "../../../domain/repositories/advogado.repository-abstract.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdvogadoOutputResolverDTO,
  advogadoOutputResolverDTO,
} from "../advogado/advogado.resolver-dto.js";
import { ProcessoInputResolverInputDTO } from "./processo.resolver-dto.js";

export type AdvogadoProcessoFieldResolverType = GraphQLFieldResolver<
  Partial<ProcessoInputResolverInputDTO>,
  ResolverContext,
  {},
  Promise<Partial<AdvogadoOutputResolverDTO> | null>
>;

export const advogadoProcessoFieldResolver: AdvogadoProcessoFieldResolverType =
  async (parent, _props, _context, info) => {
    const fields = new HandleFields(info);
    const extractFields = fields.extract();

    const fieldsKeys = fields.toStringArray<(keyof AdvogadoRepositoryDTO)[]>(
      extractFields?.["findProcesso"]?.advogado ||
        extractFields?.["searchProcesso"]?.advogado ||
        extractFields?.["listProcesso"]?.data?.advogado,
      {
        allowedFields: advogadoRepositoryColumns,
      },
    );

    const advogado_uuid = parent.criado_por_advogado_uuid;
    if (!advogado_uuid) return null;

    const data = z
      .object({
        where: x.enum({ label: "where" }, advogadoRepositoryColumns),
        value: x
          .string({ label: "value", min: 0 })
          .or(x.number({ label: "value" })),
      })
      .parse({
        where: "uuid",
        value: advogado_uuid,
      });

    const result = await advogadoRepository.find({
      ...data,
      fields: fieldsKeys,
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar o advogado.", {
        errors: [{ message: result.message }],
      });
    }

    return advogadoOutputResolverDTO(result.value);
  };
