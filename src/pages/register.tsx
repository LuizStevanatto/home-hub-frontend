import FormRegister from "@/components/FormRegister";
import Footer from "@/components/Footer";
import Head from "next/head";

function Register() {
  return (
    <>
      <Head>
        <title>Criar conta</title>
      </Head>

      <FormRegister />
      <Footer />
    </>
  );
}

export default Register;
