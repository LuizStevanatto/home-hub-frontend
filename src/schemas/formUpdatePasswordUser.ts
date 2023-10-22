import { string, z } from "zod";

const formUpdatePasswordUserSchema = z
  .object({
    currentPassword: string({
      required_error: "Informe seu senha atual",
    }).trim(),
    newPassword: string({ required_error: "Informe sua nova senha" })
      .trim()
      .min(6, "Sua senha deve ter no mínimo 6 caracteres")
      .max(48, "Sua senha deve ter no máximo 48 caracteres"),
    confirmNewPassword: string({
      required_error: "Confirme sua nova senha",
    }).trim(),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (!(newPassword == confirmNewPassword)) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
        path: ["confirmNewPassword"],
      });
    }
  });

export default formUpdatePasswordUserSchema;
