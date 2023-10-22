import { string, z } from "zod";

const formRegisterSchema = z
  .object({
    firstName: string({ required_error: "Informe seu nome" })
      .trim()
      .min(2, "Seu nome deve ter no mínimo 2 letras")
      .max(16, "Seu nome deve ter no máximo 16 letras"),
    lastName: string({ required_error: "Informe seu sobrenome" })
      .trim()
      .min(2, "Seu sobrenome deve ter no mínimo 2 letras")
      .max(16, "Seu sobrenome deve ter no máximo 16 letras"),
    email: string({ required_error: "Informe seu email" })
      .email("Informe um email válido")
      .trim()
      .min(6, "Seu email deve ter no mínimo 6 caracteres")
      .max(48, "Seu email deve ter no máximo 48 caracteres")
      .toLowerCase(),
    password: string({ required_error: "Informe sua senha" })
      .trim()
      .min(6, "Sua senha deve ter no mínimo 6 caracteres")
      .max(48, "Sua senha deve ter no máximo 48 caracteres"),
    confirmPassword: string({ required_error: "Confirme sua senha" }).trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (!(password == confirmPassword)) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
        path: ["confirmPassword"],
      });
    }
  });

export default formRegisterSchema;
