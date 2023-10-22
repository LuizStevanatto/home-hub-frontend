import Head from "next/head";
import Header from "@/components/Header";
import FormEditAccountUser from "@/components/FormEditAccountUser";
import FormUpdatePasswordUser from "@/components/FormUpdatePasswordUser";
import ManagementAccountUser from "@/components/ManagementAccountUser";
import Footer from "@/components/Footer";

function myRegister() {
  return (
    <>
      <Head>
        <title>Meus dados</title>
      </Head>

      <Header />

      <main>
        <div className="mt-14 flex flex-col gap-9">
          <FormEditAccountUser />
          <FormUpdatePasswordUser />
          <ManagementAccountUser />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default myRegister;
