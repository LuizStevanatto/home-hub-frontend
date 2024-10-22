import Banner from "@/components/Banner";
import ListProperties from "@/components/ListProperties";
import Container from "@/components/Conateiner";
import Link from "next/link";
import Head from "next/head";
import useUserStore from "@/stores/user";
import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Alguns imóveis</title>
      </Head>
      <Banner>
        <h2 className="text-3xl text-center text-white font-bold mx-4 leading-normal">
          Encontre seu próximo imóvel
        </h2>
        <Link
          href="/properties"
          type="button"
          className="py-3 px-7 bg-brand1 text-white rounded-lg font-medium"
        >
          Ver mais imóveis
        </Link>
      </Banner>
      <main className="flex-grow">
        {user && (
          <Container>
            <section className="mt-[3.125rem]">
              <h2 className="mb-[1.875rem] text-xl text-gray1 font-semibold">
                Anúncios recentes
              </h2>
              <ListProperties />
            </section>
          </Container>
        )}
      </main>
      <Footer />
    </div>
  );
}
