import { unwrapResolverError } from "@apollo/server/errors";
import { GraphQLFormattedError } from "graphql";
import { ZodError } from "zod";
import { ValidationError } from "./validation.error.js";

export function formatGraphqlError(
  formattedError: GraphQLFormattedError,
  _error: unknown,
): GraphQLFormattedError {
  const error = unwrapResolverError(_error);

  switch (true) {
    case error instanceof ZodError:
      const errors: {
        message: string;
      }[] = [];

      error.errors.forEach((error) => {
        switch (true) {
          case error.code === "invalid_union":
            error.unionErrors.forEach((error) => {
              error.issues.forEach((issue) => {
                errors.push({ message: issue.message });
              });
            });
            break;
          default:
            errors.push({ message: error.message });
        }
      });

      const validationError = new ValidationError("Erro de validação", {
        errors,
      });

      return validationError;
  }

  console.log(`formattedError`);
  console.dir(formattedError, { depth: null });
  return formattedError;
}
