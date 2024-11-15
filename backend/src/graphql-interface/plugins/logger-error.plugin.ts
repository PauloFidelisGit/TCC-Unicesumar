import { ApolloServerPlugin } from "@apollo/server";
import { Logger } from "../../utils/logger.js";
import { ResolverContext } from "../context/resolver.context.js";

export function LoggerErrorPlugin(): ApolloServerPlugin<ResolverContext> {
  return {
    async requestDidStart() {
      return {
        async didEncounterErrors({ errors, contextValue }) {
          const message = `${JSON.stringify(
            {
              user: {
                uuid: contextValue?.user?.uuid,
              },
              erro: errors,
            },
            null,
            2,
          )}`;

          Logger.error("LoggerErrorPlugin", message);
        },
      };
    },
  };
}
