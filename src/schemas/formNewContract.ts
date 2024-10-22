import { string, z } from "zod";

const formNewContract = z.object({
  startDate: z.string().nonempty("A data inicial é obrigatória"),
  endDate: z.string().nonempty("A data de término é obrigatória"),
  price: z.string().min(1, 'Informe o valor do contrato'),
  isActive: z.boolean(),
  email: z.string().email("O email deve ser válido"), // Adicionado
});

export default formNewContract;
