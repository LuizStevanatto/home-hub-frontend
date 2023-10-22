import Footer from "@/components/Footer";
import FormRegister from "@/components/FormRegister";
import Header from "@/components/Header";
import Head from "next/head";

function Register() {
  return (
    <>
      <Head>
        <title>Criar conta</title>
      </Head>
      <div className="bg-gray8  h-screen  w-full">
        <Header />
        <FormRegister />
        <div className="-mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Register;
