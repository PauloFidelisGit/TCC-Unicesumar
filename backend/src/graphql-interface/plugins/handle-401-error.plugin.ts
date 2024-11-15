import { ApolloServerPlugin } from "@apollo/server";
import { ResolverContext } from "../context/resolver.context.js";
import { INTERFACE_ERRORS } from "../enums/INTERFACE_ERRORS.js";

export function handleUnauthorizedErrorPlugin(): ApolloServerPlugin<ResolverContext> {
  return {
    async requestDidStart() {
      return {
        async didEncounterErrors({ errors, response }) {
          errors.map((error) => {
            if (
              error.extensions["code"] === INTERFACE_ERRORS.UNAUTHORIZED_ERROR
            ) {
              if (response && response.http) {
                response.http.status = 401;
              }
            }
          });
        },
      };
    },
  };
}
