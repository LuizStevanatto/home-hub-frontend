import { ReactNode } from "react";

interface IFormInfoText {
  children: ReactNode;
}

function FormInfoText({ children }: IFormInfoText) {
  return <p className="mt-2 text-gray2 leading-normal">{children}</p>;
}

export default FormInfoText;
