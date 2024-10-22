import Footer from "@/components/Footer";
import FormLogin from "@/components/FormLogin";
import Head from "next/head";

function Login() {
  return (
    <>
      <Head>
        <title>Fazer login</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <FormLogin />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Login;
