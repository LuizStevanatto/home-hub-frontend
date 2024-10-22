import { RefinementCtx, string, z } from "zod";

const formPropertySchema = z.object({
  name: string({ required_error: "Informe o título" })
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(72, "Máximo 72 caracteres"),
  description: string({
    required_error: "Ifnrome um breve descrição sobre o imóvel",
  }),
  number: z.string().min(1, 'O número é obrigatório!'),
  price: z.string().min(1, 'Informar o preço é obrigatório'),
  zipCode: z.string().min(1, 'Informar o CEP é obrigatório!'),
  country: z.string().min(1, 'O país é obrigatório'),
  state: string()
    .trim()
    .superRefine((value: string, ctx: RefinementCtx) => {
      if (value == "") {
        return ctx.addIssue({
          code: "custom",
          message: "Informe o estado do imóvel",
        });
      }

      if (value.length < 2) {
        return ctx.addIssue({
          code: "custom",
          message: "Mínimo 2 letras",
        });
      } else if (value.length > 26) {
        return ctx.addIssue({
          code: "custom",
          message: "Máximo 26 letras",
        });
      }
    }),
  city: string()
    .trim()
    .superRefine((value: string, ctx: RefinementCtx) => {
      if (value == "") {
        return ctx.addIssue({
          code: "custom",
          message: "Informe a cidade do imóvel",
        });
      }

      if (value.length < 2) {
        return ctx.addIssue({
          code: "custom",
          message: "Mínimo 2 letras",
        });
      } else if (value.length > 26) {
        return ctx.addIssue({
          code: "custom",
          message: "Máximo 26 letras",
        });
      }
    }),
    address: z.string().min(1, 'Informar o endereço é obrigatório!'),
    isAvailable: z.boolean(),
});

export default formPropertySchema;
