import { z } from "zod";

export const formSchema = z.object({
  login: z.string().max(255),
  senha: z.string().max(255),
});
export type LoginFormValues = z.input<typeof formSchema>;
