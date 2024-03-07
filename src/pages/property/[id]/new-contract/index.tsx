import FormRegisterNewContract from "@/components/FormRegisterNewContract";
import Head from "next/head";

function NewContract() {
  return (
    <>
      <Head>Novo Contrato</Head>

      <span className="flex justify-center text-xl font-bold mt-2">
        Novo Contrato
      </span>

      <FormRegisterNewContract />
    </>
  );
}

export default NewContract;
