import Container from "@/components/Conateiner";
import FormAddProperty from "@/components/FormProperty";
import Head from "next/head";
import {FormEditProperty} from "@/components/FormEditProperty";
import Footer from "@/components/Footer";

function FormProperty() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Anunciar imóvel</title>
      </Head>

      <main className="flex-grow flex justify-center">
        <div className="p-8">
          <span className="text-xl font-bold">Cadastrar propriedade</span>

          <FormAddProperty />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FormProperty;
