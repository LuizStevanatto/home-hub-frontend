import { string, z } from "zod";

const formRegisterSchema = z
	.object({
		name: string({ required_error: "Informe seu nome" })
			.trim()
			.min(2, "Seu nome deve ter no mínimo 2 letras")
			.max(16, "Seu nome deve ter no máximo 16 letras"),
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
		confirm_password: string({ required_error: "Confirme sua senha" }).trim(),
	})
	.superRefine(({ password, confirm_password }, ctx) => {
		if (!(password == confirm_password)) {
			ctx.addIssue({
				code: "custom",
				message: "As senhas devem ser iguais",
				path: ["confirm_password"],
			});
		}
	});

export default formRegisterSchema;
