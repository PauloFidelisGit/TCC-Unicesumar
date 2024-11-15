import { ENV } from "@/env";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { authMiddleware } from "./auth-middleware";

const httpLink = new HttpLink({
  uri: ENV.VITE_API_URL,
});

const cache = new InMemoryCache({
  typePolicies: {
    Advogado: {
      keyFields: ["uuid"],
    },
  },
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.error(`[Network error]: ${networkError}`);
// });

export const apolloClient = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: "all",
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
    },
  },
  defaultContext: {
    AbortController,
  },
});
