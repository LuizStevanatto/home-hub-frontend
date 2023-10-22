import { HtmlHTMLAttributes, ReactNode } from "react";

interface IContainerRest extends HtmlHTMLAttributes<HTMLDivElement> {}
interface IContainer extends IContainerRest {
  children: ReactNode;
  rest?: IContainerRest;
}

function Container({ children, ...rest }: IContainer) {
  let { className } = rest;
  className = className ? className : "";
  delete rest.className;

  return (
    <div className={`px-4 lg:px-9 ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Container;
