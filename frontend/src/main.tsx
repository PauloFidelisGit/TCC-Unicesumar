import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import "./index.css";
import { apolloClient } from "./infra/graphql/apollo-cliente";
import { customZodErrorMap } from "./lib/zod-error-map";
import { router } from "./routes/routes";

z.setErrorMap(customZodErrorMap);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
      <ToastContainer
        stacked
        closeOnClick
        theme="dark"
        position="bottom-right"
      />
    </ApolloProvider>
  </StrictMode>,
);
