import { string, z } from "zod";

const formLoginSchema = z.object({
  email: string({ required_error: "Informe seu email" })
    .trim()
    .email("Informe um email válido"),
  password: string({ required_error: "Informe sua senha" }).trim(),
});

export default formLoginSchema;
