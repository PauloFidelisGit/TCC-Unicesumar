import { ApolloServerPlugin } from "@apollo/server";
import { mariaDb } from "../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../context/resolver.context.js";

export function releaseMySQLConnectionPlugin(): ApolloServerPlugin<ResolverContext> {
  return {
    async requestDidStart() {
      return {
        async willSendResponse() {
          (await mariaDb.connection.getConnection()).release();
        },
      };
    },
  };
}
