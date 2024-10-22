import { ReactNode, TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IFormTextareaRest
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
interface IFormTextarea extends IFormTextareaRest {
  children?: ReactNode;
  register?: UseFormRegisterReturn;
  rest?: IFormTextareaRest;
}

function FormTextarea({ children, register, ...rest }: IFormTextarea) {
  return (
    <textarea
      className="h-28 w-full sm:w-[380px] py-3 px-4 text-gray1 text-sm border border-gray5 rounded-lg outline-brand1"
      {...register}
      {...rest}
    >
      {children}
    </textarea>
  );
}

export default FormTextarea;
