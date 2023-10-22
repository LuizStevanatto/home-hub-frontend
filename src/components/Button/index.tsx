import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonRest extends ButtonHTMLAttributes<HTMLButtonElement> {}
interface IButton extends IButtonRest {
  children: ReactNode;
  rest?: IButtonRest;
}

function Button({ children, ...rest }: IButton) {
  let { className, disabled } = rest;
  className ? className : "";
  delete rest.className;

  return (
    <button
      className={`h-12 w-full text-white font-semibold bg-brand1 flex items-center justify-center rounded-lg hover:bg-brand2 ${className} ${
        disabled && "bg-brand2"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
