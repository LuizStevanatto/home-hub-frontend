import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputRest extends InputHTMLAttributes<HTMLInputElement> {}
interface IFormInput extends IInputRest {
  register?: UseFormRegisterReturn;
  rest?: IInputRest;
}

function FormInput({ register, ...rest }: IFormInput) {
  return (
    <input
      {...register}
      className="h-12 w-full px-4 py-3 text-sm text-gray1 border border-gray5 rounded-lg outline-brand1 placeholder:text-sm placeholder:text-gray4"
      {...rest}
    />
  );
}

export default FormInput;
