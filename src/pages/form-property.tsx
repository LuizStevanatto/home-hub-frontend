import Container from "@/components/Conateiner";
import FormAddProperty from "@/components/FormProperty";
import Head from "next/head";
import {FormEditProperty} from "@/components/FormEditProperty";

function FormProperty() {
  return (
      <div className='flex justify-center'>
          <Head>
              <title>Anunciar imóvel</title>
          </Head>

          <div className="p-8">
              <span className="text-xl font-bold">Cadastrar propriedade</span>

              <FormAddProperty/>
          </div>
      </div>
  );
}

export default FormProperty;
