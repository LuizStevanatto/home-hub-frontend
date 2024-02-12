import Container from "@/components/Conateiner";
import FormAddProperty from "@/components/FormProperty";
import Head from "next/head";

function FormProperty() {
  return (
    <>
      <Head>
        <title>Anunciar imóvel</title>
      </Head>
      <Container>
        <FormAddProperty />
      </Container>
    </>
  );
}

export default FormProperty;
