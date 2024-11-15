import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  advogadoRepositoryColumns,
  AdvogadoRepositoryDTO,
} from "../../../domain/repositories/advogado.repository-abstract.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { AdvogadoType } from "../../types/advogado.graphql-type.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdvogadoOutputResolverDTO,
  advogadoOutputResolverDTO,
} from "./advogado.resolver-dto.js";

export type FindAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof AdvogadoRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<AdvogadoOutputResolverDTO>>
>;

const resolve: FindAdvogadoType = async (_parent, props, context, info) => {
  context.policy
    .addRule(({ required }) => {
      if (
        props.where === "uuid" &&
        context.user?.kind === "advogado" &&
        props.value === context.user?.uuid
      ) {
        return required("findYourself");
      }
      return required("findAdvogado");
    })
    .executeRules();

  const fields = new HandleFields(info);
  const extractFields = fields.extract();
  const fieldsKeys = fields.toStringArray<(keyof AdvogadoRepositoryDTO)[]>(
    extractFields["findAdvogado"],
    {
      allowedFields: advogadoRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, advogadoRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

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

export const findAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: AdvogadoType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
