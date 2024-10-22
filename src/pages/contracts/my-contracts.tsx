import MyContractsShow from "@/components/MyContracts/show";
import Head from "next/head";
import Footer from "@/components/Footer";

function MyContracts() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Meus Contratos</title>
      </Head>

      <main className="flex-grow">
        <MyContractsShow />
      </main>

      <Footer />
    </div>
  );
}

export default MyContracts;
