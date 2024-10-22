import { FormEditProperty } from "@/components/FormEditProperty";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function EditProperty() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Editar Propriedade</title>
      </Head>

      <main className="flex-grow flex justify-center">
        <div className="p-8">
          <span className="text-xl font-bold">Editar propriedade</span>

          <FormEditProperty />
        </div>
      </main>

      <Footer />
    </div>
  );
}
