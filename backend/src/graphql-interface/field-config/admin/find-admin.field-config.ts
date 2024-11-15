import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";
import { z } from "zod";
import {
  adminRepositoryColumns,
  AdminRepositoryDTO,
} from "../../../domain/repositories/admin.repository-abstract.js";
import { adminRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { UnauthorizedError } from "../../errors/unauthorized.error.js";
import { AdminType } from "../../types/admin.graphql-type.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdminOutputResolverDTO,
  adminOutputResolverDTO,
} from "./admin.resolver-dto.js";

export type FindAdminType = GraphQLFieldResolver<
  any,
  ResolverContext,
  {
    where: keyof AdminRepositoryDTO;
    value: string | number;
  },
  Promise<Partial<AdminOutputResolverDTO>>
>;

const resolve: FindAdminType = async (_parent, props, context, info) => {
  if (context.user?.kind !== "admin") {
    throw new UnauthorizedError(
      "Você não possui permissões para acessar este recurso.",
    );
  }

  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof AdminRepositoryDTO)[]>(
    extractFields["findAdmin"],
    {
      allowedFields: adminRepositoryColumns,
    },
  );

  const data = z
    .object({
      where: x.enum({ label: "where" }, adminRepositoryColumns),
      value: x
        .string({ label: "value", min: 0 })
        .or(x.number({ label: "value" })),
    })
    .parse(props);

  const result = await adminRepository.find({ ...data, fields: fieldsKeys });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar o processo.", {
      errors: [{ message: result.message }],
    });
  }

  return adminOutputResolverDTO(result.value);
};

export const findAdmin: GraphQLFieldConfig<any, any, any> = {
  type: AdminType,
  args: {
    where: NonNullString,
    value: NonNullString,
  },
  resolve,
};
