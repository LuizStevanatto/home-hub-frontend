import Head from "next/head";
import FormEditAccountUser from "@/components/FormEditAccountUser";
import FormUpdatePasswordUser from "@/components/FormUpdatePasswordUser";
import ManagementAccountUser from "@/components/ManagementAccountUser";
import Footer from "@/components/Footer";

function MyRegister() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Meus dados</title>
      </Head>

      <main className="flex-grow">
        <div className="mt-14 flex flex-col gap-9">
          <FormEditAccountUser />
          <FormUpdatePasswordUser />
          <ManagementAccountUser />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyRegister;
