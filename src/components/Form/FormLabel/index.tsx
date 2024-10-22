import { LabelHTMLAttributes, ReactNode } from "react";

interface ILabelRest extends LabelHTMLAttributes<HTMLLabelElement> {}
interface IFormLabel extends ILabelRest {
  children: ReactNode;
  rest?: ILabelRest;
}

function FormLabel({ children, ...rest }: IFormLabel) {
  let { className } = rest;
  className = className ? className : "";
  delete rest.className;

  return (
    <label
      className={`text-base mt-4 mb-1 block text-gray1 font-medium leading-normal ${className}`}
      {...rest}
    >
      {children}
    </label>
  );
}

export default FormLabel;
