import { string, z } from "zod";

const formNewContract = z.object({
  startDate: string().min(1, "Informe a data inicial do contrato"),
  endDate: string().min(1, "Informe a data de término do seu contrato"),
  isActive: z.boolean(),
  price: z.string().min(1, 'Informe o valor do contrato'),
});

export default formNewContract;
