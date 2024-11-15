import { GraphQLError } from "graphql";
import { INTERFACE_ERRORS } from "../enums/INTERFACE_ERRORS.js";
import { Logger } from "../../utils/logger.js";

export class ValidationError extends GraphQLError {
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
        code: INTERFACE_ERRORS.VALIDATION_ERROR,
        errors,
      },
    });

    Logger.error("ValidationError", this);
  }
}
