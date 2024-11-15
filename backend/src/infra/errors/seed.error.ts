import { GraphQLError } from "graphql";
import { INFRA_ERRORS } from "../enums/INFRA_ERRORS.js";
import { Logger } from "../../utils/logger.js";

export class SeedError extends GraphQLError {
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
        code: INFRA_ERRORS.SEED_ERROR,
        errors,
      },
    });

    Logger.error("ResolverError", this);
  }
}
