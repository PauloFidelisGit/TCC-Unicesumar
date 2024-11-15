import { GraphQLError } from "graphql";
import { INTERFACE_ERRORS } from "../enums/INTERFACE_ERRORS.js";
import { Logger } from "../../utils/logger.js";

export class ResolverError extends GraphQLError {
  constructor(
    message: string,
    {
      errors,
    }: {
      errors?: {
        message: string;
      }[];
    } = {},
  ) {
    super(message, {
      extensions: {
        code: INTERFACE_ERRORS.RESOLVER_ERROR,
        errors,
      },
    });

    Logger.error("ResolverError", this);
  }
}
