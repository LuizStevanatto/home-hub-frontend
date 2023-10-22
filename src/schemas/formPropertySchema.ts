import { regextOnlyNumber } from "@/utils/regexs";
import { RefinementCtx, boolean, string, z } from "zod";

const formPropertySchema = z.object({
  title: string({ required_error: "Informe o título" })
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(72, "Máximo 72 caracteres"),
  description: string({
    required_error: "Ifnrome um breve descrição sobre o imóvel",
  })
    .trim()
    .min(6, "Mínimo 6 caracteres")
    .max(900, "Máximo 990 caracteres"),
  numberRooms: string({
    required_error: "Informe a quantidade de quartos",
  })
    .trim()
    .min(1, "Informe um número"),
  numberBathrooms: string({
    required_error: "Informe a quantidade de banheiros",
  })
    .trim()
    .min(1, "Informe um número"),
  numberGarage: string({
    required_error: "Informe o número de vagas na garagem",
  })
    .trim()
    .min(1, "Informe um número"),
  propertyType: string({ required_error: "Informe o tipo de propriedade" })
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(16, "Máximo 16 caracteres"),
  isSale: string()
    .trim()
    .transform((value: string) => {
      if (value == "true") return true;
      if (value == "false") return false;
    }),
  isInCondo: string()
    .trim()
    .transform((value: string) => {
      if (value == "true") return true;
      if (value == "false") return false;
    }),
  hasPoolProperty: boolean().default(false),
  hasAirConditioningProperty: boolean().default(false),
  hasGrillProperty: boolean().default(false),
  hasFurnitureProperty: boolean().default(false),
  hasPollCondo: boolean().default(false),
  hasSecurity24hCondo: boolean().default(false),
  hasGymCondo: boolean().default(false),
  hasPartyHallCondo: boolean().default(false),
  price: string()
    .trim()
    .transform((value) => {
      const onlyNumbers = value.replace(regextOnlyNumber, "");
      return onlyNumbers;
    })
    .superRefine((value: string, ctx: RefinementCtx) => {
      if (!value) {
        return ctx.addIssue({
          code: "custom",
          message: "Informe o preço solicitado",
        });
      }
    }),
  priceCondo: string()
    .trim()
    .transform((value) => {
      const onlyNumbers = value.replace(regextOnlyNumber, "");
      return onlyNumbers;
    })
    .optional(),
  isCondoPriceIncluded: boolean().default(false),
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
  contact: string()
    .trim()
    .transform((value: string) => {
      const onlyNumbers = value.replace(regextOnlyNumber, "");
      return onlyNumbers;
    })
    .superRefine((value: string, ctx: RefinementCtx) => {
      if (!(value.length == 11)) {
        return ctx.addIssue({
          code: "custom",
          message: "Deve conter 11 números",
        });
      }
    }),
  isDisplayContact: boolean().default(true),
});

export default formPropertySchema;
