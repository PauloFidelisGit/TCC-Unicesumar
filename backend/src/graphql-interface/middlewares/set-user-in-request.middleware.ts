import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { allPermissions } from "../security/all-permissions.js";
import { cryptoToken, Token } from "../security/crypto-token.js";
import { findAdvogadoGraphqlService } from "../services/find-advogado.graphql-service.js";

type CryptoToken = Token<
  | {
      advogado: {
        uuid: string;
      };
    }
  | {
      admin: {
        uuid: string;
      };
    }
>;

export async function setUserInRequestMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  let token: CryptoToken | null = null;

  const encryptedToken = req.headers.authorization;

  if (encryptedToken !== "null" && !!encryptedToken) {
    try {
      const isExpired = cryptoToken.isExpired(encryptedToken || "");

      if (isExpired) {
        throw new UnauthorizedError("Token expirado.");
      }

      const decryptedToken = cryptoToken.decrypt<CryptoToken>(
        encryptedToken || "",
      );

      token = decryptedToken;
    } catch (_) {
      const error = new UnauthorizedError("Token inválido.");
      next(error);
    }

    try {
      switch (true) {
        case token && "advogado" in token: {
          req["user"] = await findAdvogadoGraphqlService(token.advogado.uuid);
          break;
        }
        case token && "admin" in token: {
          req["user"] = {
            kind: "admin",
            uuid: "",
            permissoes: allPermissions.map((permission) => permission.nome),
          };
          break;
        }
        default: {
          throw new UnauthorizedError("Token inválido.");
        }
      }
    } catch (_) {
      const error = new UnauthorizedError("Usuário não encontrado.");
      next(error);
    }
  }

  next();
}
