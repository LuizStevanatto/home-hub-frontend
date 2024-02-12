import Head from "next/head";
import FormEditAccountUser from "@/components/FormEditAccountUser";
import FormUpdatePasswordUser from "@/components/FormUpdatePasswordUser";
import ManagementAccountUser from "@/components/ManagementAccountUser";

function myRegister() {
  return (
    <>
      <Head>
        <title>Meus dados</title>
      </Head>

      <main>
        <div className="mt-14 flex flex-col gap-9">
          <FormEditAccountUser />
          <FormUpdatePasswordUser />
          <ManagementAccountUser />
        </div>
      </main>
    </>
  );
}

export default myRegister;
