import EditContract from "@/components/Contracts/edit";
import Head from "next/head";
import Footer from "@/components/Footer";

function EditContractPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Editar Contrato</title>
      </Head>

      <main className="flex-grow">
        <span className="flex justify-center text-xl font-bold mt-2">
          Edite seu Contrato
        </span>

        <EditContract />
      </main>

      <Footer />
    </div>
  );
}

export default EditContractPage;
