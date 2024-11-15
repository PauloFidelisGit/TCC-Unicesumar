import { LOCAL_STORAGE_TOKENS } from "@/domain/enums/TOKENS";
import { ApolloLink } from "@apollo/client";

export const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKENS.AUTH);

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));

  return forward(operation);
});
