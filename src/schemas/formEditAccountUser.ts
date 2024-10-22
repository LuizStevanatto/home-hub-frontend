import { string, z } from "zod";

const formEditAccountUserSchema = z.object({
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
  password: z.string().min(1, 'A confirmação de senha é obrigatória'),
});

export default formEditAccountUserSchema;
