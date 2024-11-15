import { GraphQLError } from "graphql";
import { Logger } from "../../utils/logger.js";
import { DOMAIN_ERRORS } from "../enums/DOMAIN_ERRORS.js";

export class PasswordError extends GraphQLError {
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
        code: DOMAIN_ERRORS.PASSWORD_ERROR,
        errors,
      },
    });

    Logger.error("PasswordError", this);
  }
}
