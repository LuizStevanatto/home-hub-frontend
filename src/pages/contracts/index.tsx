import ShowContracts from "@/components/Contracts/show";
import Head from "next/head";
import Footer from "@/components/Footer";

function Contratos() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Contratoss</title>
      </Head>

      <main className="flex-grow">
        <ShowContracts/>
      </main>

      <Footer />
    </div>
  );
}

export default Contratos;
