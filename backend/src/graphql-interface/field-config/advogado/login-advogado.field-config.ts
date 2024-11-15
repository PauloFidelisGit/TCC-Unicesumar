import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType,
} from "graphql";
import { z } from "zod";
import { passwordCryptoManager } from "../../../domain/security/password.manager.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { UnauthorizedError } from "../../errors/unauthorized.error.js";
import { cryptoToken } from "../../security/crypto-token.js";
import { NonNullString } from "../../types/aliases.js";
import { x } from "../../utils/custom-zod.js";
import {
  PickAdvogadoInputResolverDTO,
  PickAdvogadoOutputResolverDTO,
} from "./advogado.resolver-dto.js";

export type LoginAdvogadoType = GraphQLFieldResolver<
  any,
  ResolverContext,
  PickAdvogadoInputResolverDTO<{
    login: string;
    senha: string;
  }>,
  Promise<
    PickAdvogadoOutputResolverDTO<{
      uuid: string;
    }> & { token: string }
  >
>;

const resolve: LoginAdvogadoType = async (_parent, props, _context, _info) => {
  const data = z
    .object({
      login: x.string({ label: "login" }),
      senha: x.string({ label: "senha" }),
    })
    .parse(props);

  const resultAdvogado = await advogadoRepository.find({
    where: "login",
    value: data.login,
    fields: ["senha", "uuid"],
  });

  if (!resultAdvogado.success)
    throw new UnauthorizedError("Usuário ou senha inválidos.");

  if (resultAdvogado.value.senha && resultAdvogado.value.uuid) {
    const resultHasPermission = await advogadoRepository.hasPermission({
      advogado_uuid: resultAdvogado.value.uuid,
      permission_name: "loginAdvogado",
    });

    if (resultHasPermission.success && !resultHasPermission.value) {
      throw new UnauthorizedError(
        "Você não tem permissão para acessar o sistema.",
      );
    }

    const match = await passwordCryptoManager.compare(
      resultAdvogado.value.senha,
      data.senha,
    );

    if (!match) {
      throw new UnauthorizedError("Usuário ou senha inválidos.");
    }

    const token = cryptoToken.createToken(
      {
        advogado: {
          uuid: resultAdvogado.value.uuid,
        },
      },
      {
        minutes: 360,
      },
    );

    return {
      uuid: resultAdvogado.value.uuid!,
      token,
    };
  }

  throw new UnauthorizedError("Usuário ou senha inválidos.");
};

export const loginAdvogado: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: "LoginAdvogado",
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
