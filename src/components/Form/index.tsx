import { FormHTMLAttributes, ReactNode } from "react";

interface IFormRest extends FormHTMLAttributes<HTMLFormElement> {}
interface IForm extends IFormRest {
  children: ReactNode;
  rest?: IFormRest;
}

function Form({ children, ...rest }: IForm) {
  let { className } = rest;
  className = className ? className : "";
  delete rest?.className;

  return (
    <form
      className={`max-w-lg p-9 bg-white rounded-lg mx-auto ${className}`}
      {...rest}
    >
      {children}
    </form>
  );
}

export default Form;
