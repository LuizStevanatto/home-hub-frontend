import { string, z } from "zod";

const formDeleteAccountUserSchema = z.object({
  password: string({ required_error: "Informe sua senha" }).trim(),
});

export default formDeleteAccountUserSchema;
