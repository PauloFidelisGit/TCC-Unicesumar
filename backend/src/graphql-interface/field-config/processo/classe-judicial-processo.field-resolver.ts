import { GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  classeJudicialRepositoryColumns,
  ClasseJudicialRepositoryDTO,
} from "../../../domain/repositories/classe-judicial.repository-abstract.js";
import { classeJudicialRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  ClasseJudicialOutputResolverDTO,
  classeJudicialOutputResolverDTO,
} from "../judiciario/classe-judicial.resolver-dto.js";
import { ProcessoInputResolverInputDTO } from "./processo.resolver-dto.js";

export type ClasseJudicialProcessoFieldResolverType = GraphQLFieldResolver<
  Partial<ProcessoInputResolverInputDTO>,
  ResolverContext,
  any,
  Promise<Partial<ClasseJudicialOutputResolverDTO> | null>
>;

export const classeJudicialProcessoFieldResolver: ClasseJudicialProcessoFieldResolverType =
  async (parent, _props, _context, info) => {
    const fields = new HandleFields(info);

    const extractFields = fields.extract();

    const fieldsKeys = fields.toStringArray<
      (keyof ClasseJudicialRepositoryDTO)[]
    >(
      extractFields?.["findProcesso"]?.classe_judicial ||
        extractFields?.["searchProcesso"]?.classe_judicial ||
        extractFields?.["listProcesso"]?.classe_judicial,
      {
        allowedFields: classeJudicialRepositoryColumns,
      },
    );

    const classe_judicial_uuid = parent.classe_judicial_uuid;
    if (!classe_judicial_uuid) return null;

    const data = z
      .object({
        where: x.enum({ label: "where" }, classeJudicialRepositoryColumns),
        value: x.string({ label: "value" }),
      })
      .parse({
        where: "uuid",
        value: classe_judicial_uuid,
      });

    const result = await classeJudicialRepository.find({
      ...data,
      fields: fieldsKeys,
    });

    if (!result.success) {
      throw new ResolverError("Não foi possível encontrar a classe judicial.", {
        errors: [{ message: result.message }],
      });
    }

    return classeJudicialOutputResolverDTO(result.value);
  };
