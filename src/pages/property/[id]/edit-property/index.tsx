import { FormEditProperty } from "@/components/FormEditProperty";
import Head from "next/head";

export default function EditProperty() {
  return (
    <>
      <Head>Editar Propriedade</Head>

      <div className="p-8">
        <span className="text-xl font-bold">Editar propriedade</span>

        <FormEditProperty />
      </div>
    </>
  );
}
