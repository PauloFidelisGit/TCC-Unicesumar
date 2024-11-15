import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  orgaoRepositoryColumns,
  OrgaoRepositoryDTO,
} from "../../../domain/repositories/orgao.repository-abstract.js";
import { orgaoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  OrgaoOutputResolverDTO,
  orgaoOutputResolverDTO,
} from "../judiciario/orgao.resolver-dto.js";
import { ProcessoInputResolverInputDTO } from "./processo.resolver-dto.js";

export type OrgaoProcessoFieldResolverType = GraphQLFieldResolver<
  Partial<ProcessoInputResolverInputDTO>,
  ResolverContext,
  any,
  Promise<Partial<OrgaoOutputResolverDTO> | null>
>;

export const orgaoProcessoFieldResolver: OrgaoProcessoFieldResolverType =
  async (parent, _props, _context, info) => {
    const fields = new HandleFields(info);
    const extractFields = fields.extract();

    const fieldsKeys = fields.toStringArray<(keyof OrgaoRepositoryDTO)[]>(
      extractFields?.["findProcesso"]?.orgao ||
        extractFields?.["searchProcesso"]?.orgao ||
        extractFields?.["listProcesso"]?.orgao,
      {
        allowedFields: orgaoRepositoryColumns,
      },
    );

    const orgao_uuid = parent.orgao_uuid;
    if (!orgao_uuid) return null;

    const data = z
      .object({
        where: x.enum({ label: "where" }, orgaoRepositoryColumns),
        value: x
          .string({ label: "value", min: 0 })
          .or(x.number({ label: "value" })),
      })
      .parse({
        where: "uuid",
        value: orgao_uuid,
      });

    const result = await orgaoRepository.find({
      ...data,
      fields: fieldsKeys,
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar o órgão.", {
        errors: [{ message: result.message }],
      });
    }
    return orgaoOutputResolverDTO(result.value);
  };
