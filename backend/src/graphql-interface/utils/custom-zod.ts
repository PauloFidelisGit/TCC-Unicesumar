import { EnumLike, z, ZodTypeAny } from "zod";

class CustomZod {
  static array<T extends z.ZodType<any, any>>(
    args: { label: string },
    schema: T,
  ) {
    return z.array(schema, {
      errorMap(error, ctx) {
        switch (error.code) {
          case z.ZodIssueCode.invalid_type:
            return {
              message: `O campo '${args?.label}' deve ser do tipo '${error.expected}'.`,
            };
          default:
            return { message: ctx.defaultError };
        }
      },
    });
  }

  static union<T extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(
    args: { label: string },
    schemas: T,
  ) {
    return z.union(schemas, {
      errorMap(error, ctx) {
        switch (error.code) {
          case z.ZodIssueCode.invalid_union:
            return {
              message: `Valor inválido para a união '${args?.label}'.`,
            };
          default:
            return { message: ctx.defaultError };
        }
      },
    });
  }

  static enum<T extends readonly [string, ...string[]]>(
    args: { label: string },
    values: T,
  ) {
    return z.enum(values, {
      errorMap(error, ctx) {
        switch (error.code) {
          case z.ZodIssueCode.invalid_enum_value:
            return {
              message: `Valor inválido para o campo '${args?.label}'.`,
            };
          case z.ZodIssueCode.invalid_type:
            return {
              message: `Valor inválido para o campo '${args?.label}'.`,
            };
          default:
            return { message: ctx.defaultError };
        }
      },
    });
  }

  static nativeEnum<T extends EnumLike>(args: { label: string }, values: T) {
    return z.nativeEnum(values, {
      errorMap(error, ctx) {
        switch (error.code) {
          case z.ZodIssueCode.invalid_enum_value:
            return {
              message: `Valor inválido para o campo '${args?.label}'.`,
            };
          case z.ZodIssueCode.invalid_type:
            return {
              message: `Valor inválido para o campo '${args?.label}'.`,
            };
          default:
            return { message: ctx.defaultError };
        }
      },
    });
  }

  static instanceof(args: { label: string }, cls: any) {
    return z.instanceof(cls, {
      message: `O campo '${args?.label}' deve ser uma instância de '${cls.name}'.`,
    });
  }

  static uuid(args: { label: string }) {
    return CustomZod.string(args).uuid({
      message: `O campo '${args?.label}' deve ser um UUID válido.`,
    });
  }

  /**
   * @default { min: 1, max: 255 }
   */
  static string(args: {
    label: string;
    min?: number;
    max?: number;
    length?: number;
  }) {
    const schema = z
      .string({
        errorMap(error, ctx) {
          switch (error.code) {
            case z.ZodIssueCode.invalid_type:
              if (typeof error.received === undefined)
                return {
                  message: `O campo '${args?.label}' é obrigatório.`,
                };
              return {
                message: `O campo '${args?.label}' deve ser do tipo '${error.expected}' mas recebeu '${error.received}'.`,
              };
            case z.ZodIssueCode.too_small:
              return {
                message: `O campo '${args?.label}' deve ter no mínimo '${error.minimum}' caracteres.`,
              };
            case z.ZodIssueCode.too_big:
              return {
                message: `O campo '${args?.label}' deve ter no máximo '${error.maximum}' caracteres.`,
              };
            case z.ZodIssueCode.invalid_enum_value:
              return {
                message: `Valor inválido para o campo '${args?.label}'.`,
              };
            default:
              return { message: ctx.defaultError };
          }
        },
      })
      .min(args.min === 0 ? 0 : args.min || 1)
      .max(args.max || 255)
      .trim();

    if (args.length) return schema.length(args.length);
    else return schema;
  }

  static arrayString(args: { label: string }) {
    return z.array(CustomZod.string(args), {});
  }

  static number(args: { label: string }) {
    return z.number({
      errorMap(error, ctx) {
        switch (error.code) {
          case z.ZodIssueCode.invalid_type:
            return {
              message: `O campo '${args?.label}' deve ser do tipo '${error.expected}'.`,
            };
          default:
            return { message: ctx.defaultError };
        }
      },
    });
  }

  static float(
    args: { label: string; positive?: boolean } = { label: "", positive: true },
  ) {
    return z
      .number({
        errorMap(error, ctx) {
          switch (error.code) {
            case z.ZodIssueCode.invalid_type:
              return {
                message: `O campo '${args?.label}' deve ser do tipo '${error.expected}'.`,
              };
            default:
              return { message: ctx.defaultError };
          }
        },
      })
      .refine((val) => Number.isFinite(val) && Number(val.toFixed(2)) === val, {
        message: `O campo '${args?.label}' deve ser um número com no máximo duas casas decimais.`,
        path: [args.label],
      })
      .refine(
        (val) => {
          if (args.positive) {
            return val > 0;
          }
          return true;
        },
        {
          message: `O campo '${args?.label}' deve ser um número positivo.`,
          path: [args.label],
        },
      );
  }

  static floatString(args: { label: string }) {
    return z.coerce
      .number({
        errorMap(error, ctx) {
          switch (error.code) {
            case z.ZodIssueCode.invalid_type:
              return {
                message: `O campo '${args?.label}' deve ser do tipo '${error.expected}'.`,
              };
            default:
              return { message: ctx.defaultError };
          }
        },
      })
      .refine((val) => Number.isFinite(val) && Number(val.toFixed(2)) === val, {
        message: `O campo '${args?.label}' deve ser um número com no máximo duas casas decimais.`,
      })
      .transform((val) => val.toString());
  }

  static boolean(args: { label: string }) {
    return z.boolean({
      errorMap(error, ctx) {
        switch (error.code) {
          case z.ZodIssueCode.invalid_type:
            return {
              message: `O campo '${args?.label}' deve ser do tipo '${error.expected}'.`,
            };
          default:
            return { message: ctx.defaultError };
        }
      },
    });
  }

  /**
   *  @expected "YYYY-MM-DDTHH:MM:SSZ"
   */
  static dateISOString(args: { label: string }) {
    return z
      .string({
        message: `O campo '${args?.label}' deve ser uma string.`,
      })
      .datetime({
        message: `O campo '${args?.label}' deve ser uma data válida no padrão YYYY-MM-DDTHH:MM:SSZ.`,
      })
      .refine(
        (date) => {
          if (date) {
            return new Date(date).getFullYear() > 1970;
          }
          return true;
        },
        {
          message: "A data de data_abertura não pode ser anterior a 1790.",
        },
      );
  }

  static toISOStringLocal(args: { label: string }) {
    return z
      .string()
      .datetime({
        message: `O campo '${args?.label}' deve ser uma data válida.`,
        local: true,
      })
      .refine(
        (date) => {
          if (date) {
            return new Date(date).getFullYear() > 1970;
          }
          return true;
        },
        {
          message: "A data de data_abertura não pode ser anterior a 1790.",
        },
      );
  }

  /**
   * @expected_input 2024-01-01
   * */
  static dateISO8601(args: { label: string }) {
    return z
      .string()
      .date(
        `O campo '${args?.label}' deve ser uma data válida no padrão YYYY-MM-DD.`,
      )
      .refine(
        (date) => {
          if (date) {
            return new Date(date).getFullYear() > 1970;
          }
          return true;
        },
        {
          message: "A data de data_abertura não pode ser anterior a 1790.",
        },
      );
  }
}
export const x = CustomZod;
