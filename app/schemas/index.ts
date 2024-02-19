import { isValid, parse } from "date-fns";
import { enGB } from "date-fns/locale";
import { z } from "zod";

export const createWorkSchema = z.object({
  name: z.string().min(1, "Nome da obra é obrigatório").max(200),
  customerId: z.string({ required_error: "O cliente é obrigatório" }),
});

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Nome do cliente é obrigatório").max(200),
});

export const createConcreteSchema = z.object({
  moldingDate: z
    .string({ required_error: "A data de modelagem é obrigatória" })
    .min(1, "A data de modelagem é obrigatória")
    .transform((moldingDate, ctx) => {
      const parsedDate = parse(moldingDate, "P", new Date(), {
        locale: enGB,
      });

      if (!isValid(parsedDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Data no formato inválido",
        });
      }

      return moldingDate;
    }),
  invoice: z.string().min(1, "A nota fiscal é obrigatória"),
  qtd_cp: z.coerce.number().min(1, "A quantidade é obrigatória"),
  fck: z.coerce.number().min(1, "FCK é obrigatório"),
  slump: z.coerce.number().min(1, "Slump é obrigatório"),
  piece: z.coerce.string().min(1, "A descrição da peça é obrigatória"),
  workId: z.string({ required_error: "A obra é obrigatória" }),
});

export const createRuptureSchema = z.object({
  concreteId: z.string({ required_error: "A concretagem é obrigatória" }),
  tf14h1: z.coerce
    .number({ invalid_type_error: "TF 14h deve ser um número" })
    .optional(),
  tf14h2: z.coerce
    .number({ invalid_type_error: "TF 14h deve ser um número" })
    .optional(),
  tf7d1: z.coerce
    .number({ invalid_type_error: "TF 7d deve ser um número" })
    .optional(),
  tf7d2: z.coerce
    .number({ invalid_type_error: "TF 7d deve ser um número" })
    .optional(),
  tf28d1: z.coerce
    .number({ invalid_type_error: "TF 28d deve ser um número" })
    .optional(),
  tf28d2: z.coerce
    .number({ invalid_type_error: "TF 28d deve ser um número" })
    .optional(),
  tf63d: z.coerce
    .number({ invalid_type_error: "TF 63d deve ser um número" })
    .optional(),
  mpa14h1: z.coerce
    .number({ invalid_type_error: "MPA 14h deve ser um número" })
    .optional(),
  mpa14h2: z.coerce
    .number({ invalid_type_error: "MPA 14h deve ser um número" })
    .optional(),
  mpa7d1: z.coerce
    .number({ invalid_type_error: "MPA 7d deve ser um número" })
    .optional(),
  mpa7d2: z.coerce
    .number({ invalid_type_error: "MPA 7d deve ser um número" })
    .optional(),
  mpa28d1: z.coerce
    .number({ invalid_type_error: "MPA 28d deve ser um número" })
    .optional(),
  mpa28d2: z.coerce
    .number({ invalid_type_error: "MPA 28d deve ser um número" })
    .optional(),
  mpa63d: z.coerce
    .number({ invalid_type_error: "MPA 63d deve ser um número" })
    .optional(),
});
