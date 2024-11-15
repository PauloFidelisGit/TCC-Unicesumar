import { z } from "zod";

export const customZodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (true) {
    case issue.code === z.ZodIssueCode.too_small: {
      return {
        message: `O campo deve possuir no minímo ${issue.minimum} caracteres.`,
      };
    }
    case issue.code === z.ZodIssueCode.too_big: {
      return {
        message: `O campo deve possuir no máximo ${issue.maximum} caracteres.`,
      };
    }
    default:
      break;
  }

  return { message: ctx.defaultError };
};
