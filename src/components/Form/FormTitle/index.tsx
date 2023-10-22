import { HtmlHTMLAttributes, ReactNode } from "react";

interface ITitleRest extends HtmlHTMLAttributes<HTMLElement> {}
interface IFormTitle extends ITitleRest {
  children: ReactNode;
  rest?: ITitleRest;
}

function FormTitle({ children, ...rest }: IFormTitle) {
  let { className } = rest;
  className = className ? className : "";
  delete rest.className;

  return (
    <h2 className={` text-xl text-gray1 font-bold  ${className}`} {...rest}>
      {children}
    </h2>
  );
}

export default FormTitle;
