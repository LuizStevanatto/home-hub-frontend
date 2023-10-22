import Header from "@/components/Header";
import FormLogin from "@/components/FormLogin";
import Footer from "@/components/Footer";
import Head from "next/head";

function Login() {
  return (
    <>
      <Head>
        <title>Fazer login</title>
      </Head>
      <div className="bg-gray8  h-screen  w-screen">
        <Header />
        <FormLogin />
        <div className="absolute right-0 bottom-0 left-0">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Login;
