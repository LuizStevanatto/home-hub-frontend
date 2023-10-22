import Container from "@/components/Conateiner";
import Footer from "@/components/Footer";
import FormAddProperty from "@/components/FormProperty";
import Header from "@/components/Header";
import Head from "next/head";

function FormProperty() {
  return (
    <>
      <Head>
        <title>Anunciar imóvel</title>
      </Head>
      <Header />
      <Container>
        <FormAddProperty />
      </Container>
      <Footer />
    </>
  );
}

export default FormProperty;
