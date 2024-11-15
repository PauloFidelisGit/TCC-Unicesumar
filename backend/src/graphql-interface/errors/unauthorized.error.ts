import { GraphQLError } from "graphql";
import { INTERFACE_ERRORS } from "../enums/INTERFACE_ERRORS.js";
import { Logger } from "../../utils/logger.js";

export class UnauthorizedError extends GraphQLError {
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
        code: INTERFACE_ERRORS.UNAUTHORIZED_ERROR,
        errors,
      },
    });

    Logger.error("UnauthorizedError", this);
  }
}
