import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { passwordCryptoManager } from "../../../domain/security/password.manager.js";
import { adminRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { UnauthorizedError } from "../../errors/unauthorized.error.js";
import { cryptoToken } from "../../security/crypto-token.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickAdminInputResolverDTO,
  PickAdminOutputResolverDTO,
} from "./admin.resolver-dto.js";

export type LoginAdminType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAdminInputResolverDTO<{
    login: string;
    senha: string;
  }>,
  Promise<
    PickAdminOutputResolverDTO<{
      uuid: string;
    }> & { token: string }
  >
>;

const resolve: LoginAdminType = async (_parent, props, _context, _info) => {
  const data = z
    .object({
      login: x.string({ label: "login" }),
      senha: x.string({ label: "senha" }),
    })
    .parse(props);

  const result = await adminRepository.find({
    where: "login",
    value: props.login,
    fields: ["senha", "uuid"],
  });

  if (!result.success) {
    throw new UnauthorizedError("Usuário ou senha inválidos.");
  }

  if (result.value.senha) {
    const match = await passwordCryptoManager.compare(
      result.value.senha,
      data.senha,
    );
    if (!match) {
      throw new UnauthorizedError("Usuário ou senha inválidos.");
    }
    const token = cryptoToken.createToken(
      {
        admin: {
          uuid: result.value.uuid,
        },
      },
      {
        minutes: 360,
      },
    );
    return {
      uuid: result.value.uuid!,
      token,
    };
  }

  throw new UnauthorizedError("Usuário ou senha inválidos.");
};

export const loginAdmin: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "LoginAdmin",
    fields: {
      uuid: NonNullString,
      token: NonNullString,
    },
  }),
  args: {
    login: NonNullString,
    senha: NonNullString,
  },
  resolve,
};
