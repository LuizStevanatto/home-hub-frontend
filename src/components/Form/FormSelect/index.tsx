import { ReactNode, SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IFormSelectRest extends SelectHTMLAttributes<HTMLSelectElement> {}

interface IFormSelect extends IFormSelectRest {
  children?: ReactNode;
  register?: UseFormRegisterReturn;
  rest?: IFormSelect;
}

function FormSelect({ children, register, ...rest }: IFormSelect) {
  let { className } = rest;
  className = className ? className : "";
  delete rest.className;

  return (
    <select
      className={`w-full sm:w-[380px] py-3 px-4 text-sm text-gray1 bg-white border border-gray5 outline-brand1 rounded-lg ${className}`}
      {...register}
      {...rest}
    >
      {children}
    </select>
  );
}

export default FormSelect;
