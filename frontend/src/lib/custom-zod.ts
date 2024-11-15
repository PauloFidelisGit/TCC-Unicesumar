import { z } from "zod";

export class CustomZodToform {
  static string = (
    args: { min: number; max: number } = {
      min: 0,
      max: 255,
    },
  ) => z.string().min(args.min).max(args.max);

  static uuid = () => z.string().uuid();

  /**
   * @param positive default is true
   */
  static floatString = (
    args: { positive?: boolean } = {
      positive: true,
    },
  ) =>
    z.string().superRefine((data, ctx) => {
      if (data === "") return data;
      if (isNaN(parseFloat(data))) {
        return ctx.addIssue({
          message: "O campo deve ser um número",
          path: ctx.path,
          code: "invalid_type",
          expected: "number",
          received: typeof data,
        });
      }
      if (args.positive && parseFloat(data) < 0) {
        return ctx.addIssue({
          message: "O campo deve ser um número positivo",
          path: ctx.path,
          code: "invalid_type",
          expected: "number",
          received: typeof data,
        });
      }
      return data;
    });

  /**
   * @param positive default is true
   */
  static float = (
    args: { positive?: boolean } = {
      positive: true,
    },
  ) =>
    z.number().superRefine((data, ctx) => {
      if (data === 0) return;
      if (args.positive && data < 0) {
        return ctx.addIssue({
          message: "O campo deve ser um número positivo",
          path: ctx.path,
          code: "invalid_type",
          expected: "number",
          received: typeof data,
        });
      }
    });

  static selectNav = (args?: { required?: boolean }) =>
    z.object({
      value: args?.required
        ? z
            .string()
            .min(36, {
              message: "Campo obrigatório",
            })
            .uuid()
        : z.string().uuid().or(z.literal("")),
      label: z.string(),
    });

  static positiveInt = () => z.number().int().positive();

  // static positiveStringInt = () => z.string().regex(/^\d+$/);

  static nativeEnum = <
    T extends {
      [k: string]: string | number;
      [nu: number]: string;
    },
  >(
    enumObject: T,
  ) => z.nativeEnum(enumObject);

  // /**
  //  * @expected 2024-08-19T18:51:57Z
  //  * @description ISO8601
  //  */
  // static dateTime = () =>
  //   z.string().superRefine((data, ctx) => {
  //     const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  //     if (!regex.test(data)) {
  //       return ctx.addIssue({
  //         message:
  //           "O campo deve ser uma data e hora válida no formato 2024-08-19T18:51:57Z",
  //         code: ZodIssueCode.custom,
  //       });
  //     }
  //   });

  // /**
  //  * @expected 2024-08-19
  //  * @description ISO8601
  //  */
  // static date = () =>
  //   z.string().superRefine((data, ctx) => {
  //     const regex = /^\d{4}-\d{2}-\d{2}$/;
  //     if (!regex.test(data)) {
  //       return ctx.addIssue({
  //         message:
  //           "O campo deve ser uma data e hora válida no formato 2024-08-19",
  //         code: ZodIssueCode.custom,
  //       });
  //     }
  //   });
}

export const x = CustomZodToform;
