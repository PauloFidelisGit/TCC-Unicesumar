import { GraphQLError } from "graphql";
import { DOMAIN_ERRORS } from "../enums/DOMAIN_ERRORS.js";
import { Logger } from "../../utils/logger.js";

export class DatabaseError extends GraphQLError {
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
        code: DOMAIN_ERRORS.DATABASE_ERROR,
        errors,
      },
    });

		Logger.error("DatabaseError", this);
  }
}
