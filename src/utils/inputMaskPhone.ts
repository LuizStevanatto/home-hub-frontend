import { KeyboardEvent } from "react";
import { regextOnlyNumber } from "./regexs";

export function handleMaskPhoneInput(event: KeyboardEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  input.value = handleCreateMuskPhone(input.value);
}

export function handleCreateMuskPhone(value: string | undefined) {
  if (!value?.trim() || undefined) return "";

  value = value.replace(regextOnlyNumber, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");

  return value;
}

export function handleCreateMuskCurrency(
  event: KeyboardEvent<HTMLInputElement>
) {
  const input = event.currentTarget;
  const value = input.value;
  const valueOnlyNumber = Number(value.replace(regextOnlyNumber, ""));

  input.value = valueOnlyNumber.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 0,
  });
}
