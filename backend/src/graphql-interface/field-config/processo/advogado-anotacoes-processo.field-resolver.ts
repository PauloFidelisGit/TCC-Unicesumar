import { GraphQLFieldResolver } from "graphql";
import {
  advogadoRepositoryColumns,
  AdvogadoRepositoryDTO,
} from "../../../domain/repositories/advogado.repository-abstract.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdvogadoOutputResolverDTO,
  advogadoOutputResolverDTO,
} from "../advogado/advogado.resolver-dto.js";
import { AnotacoesProcessoInputResolverDTO } from "./anotacoes-processo.resolver-dto.js";

export type AdvogadoAnotacoesProcessoFieldResolverType = GraphQLFieldResolver<
  Partial<AnotacoesProcessoInputResolverDTO>,
  ResolverContext,
  {},
  Promise<Partial<AdvogadoOutputResolverDTO> | null>
>;

export const advogadoAnotacoesProcessoFieldResolver: AdvogadoAnotacoesProcessoFieldResolverType =
  async (parent, _props, _context, info) => {
    const fields = new HandleFields(info);
    const extractFields = fields.extract();

    const fieldsKeys = fields.toStringArray<(keyof AdvogadoRepositoryDTO)[]>(
      extractFields["findAnotacoesProcesso"]?.["advogado"] ||
        extractFields["searchAnotacoesProcesso"]?.["advogado"] ||
        extractFields["listAnotacoesProcesso"]?.["data"]?.["advogado"],
      {
        allowedFields: advogadoRepositoryColumns,
      },
    );

    const advogado_uuid = parent.criado_por_advogado_uuid;
    if (!advogado_uuid) return null;

    const result = await advogadoRepository.find({
      where: "uuid",
      value: advogado_uuid,
      fields: fieldsKeys,
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar o advogado.", {
        errors: [{ message: result.message }],
      });
    }

    return advogadoOutputResolverDTO(result.value);
  };
