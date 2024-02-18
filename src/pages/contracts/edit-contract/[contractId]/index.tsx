import EditContract from "@/components/Contracts/edit";
import Head from "next/head";

function EditContractPage() {
  return (
    <>
      <Head>Editar Contrato</Head>

      <span className="flex justify-center text-xl font-bold mt-2">
        Edite seu Contrato
      </span>

      <EditContract />
    </>
  );
}

export default EditContractPage;
