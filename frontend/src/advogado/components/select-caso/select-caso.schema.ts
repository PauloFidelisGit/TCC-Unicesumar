import { z } from "zod";

export const formSchema = z.object({
  value: z.string().min(0).max(255),
  where: z.string().min(1).max(255),
});
export type FormSchema = z.input<typeof formSchema>;
