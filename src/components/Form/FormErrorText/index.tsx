import { HtmlHTMLAttributes, ReactNode } from "react";

interface IFormErrorTextRest extends HtmlHTMLAttributes<HTMLElement> {}
interface IFormErrorText extends IFormErrorTextRest {
  children: ReactNode;
  rest?: IFormErrorText;
}

function FormErrorText({ children, ...rest }: IFormErrorText) {
  let { className } = rest;
  className = className ? className : "";
  delete rest.className;

  return (
    <span className={`block text-sm text-alert1 ${className}`} {...rest}>
      {children}
    </span>
  );
}

export default FormErrorText;
