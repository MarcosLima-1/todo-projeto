import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string({ message: "Ocorreu um erro" })
    .min(1, { message: "Escreva algo" })
    .max(32, { message: "Muitos caracteres" }),
  description: z.optional(z.string().max(256)),
  id: z.optional(z.string()),
});

export const templateSchema = z.object({
  name: z
    .string({ message: "Ocorreu um erro" })
    .min(1, { message: "Escreva algo" })
    .max(16, { message: "Muitos caracteres" }),
});
