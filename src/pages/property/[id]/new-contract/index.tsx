import FormRegisterNewContract from "@/components/FormRegisterNewContract";
import Head from "next/head";
import Footer from "@/components/Footer";

function NewContract() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Novo Contrato</title>
      </Head>

      <main className="flex-grow">
        <span className="flex justify-center text-xl font-bold mt-2">
          Novo Contrato
        </span>

        <FormRegisterNewContract />
      </main>

      <Footer />
    </div>
  );
}

export default NewContract;
