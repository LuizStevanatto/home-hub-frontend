import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IFormInputRadioRest extends InputHTMLAttributes<HTMLInputElement> {}
interface IFormInputRadio extends IFormInputRadioRest {
  textInput: string;
  register?: UseFormRegisterReturn;
  rest?: IFormInputRadioRest;
}

function FormInputRadio({ textInput, register, ...rest }: IFormInputRadio) {
  return (
    <label className="py-3 px-6 border border-gray5 rounded-lg max-w-max flex items-center gap-2 text-sm accent-brand1">
      <input type="radio" {...rest} {...register} />
      <span>{textInput}</span>
    </label>
  );
}

export default FormInputRadio;
