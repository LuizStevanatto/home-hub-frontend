import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

import Container from "@/components/Conateiner";
import { IProperty, usePropertyStore } from "@/stores/property";

function Property() {
  const { getProperty } = usePropertyStore();
  const [property, setProperty] = useState<IProperty | null>(null);
  const router = useRouter();
  const propertyId = router.query.id;

  const getPropertyInDb = React.useCallback(async () => {
    const getPropertyById = await getProperty(String(propertyId));

    setProperty(getPropertyById);
  }, [getProperty, propertyId]);

  React.useEffect(() => {
    getPropertyInDb();
  }, [getPropertyInDb]);

  function handleFormatedCurrency(value: number | undefined) {
    if (value == undefined) return null;
    return value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
      maximumFractionDigits: 0,
    });
  }

  const priceFormatted = handleFormatedCurrency(property?.price);

  return (
    <>
      <Head>
        <title>Propriedade</title>
      </Head>

      <Container>
        <main className="sm:flex sm:flex-row-reverse sm:justify-between sm:gap-9">
          <div className="h-max w-full mt-5 sm:min-w-min sm:max-w-max p-7 bg-white border border-gray5 rounded-b-lg flex flex-col sm:relative sm:z-10 sm:-mt-10 sm:p-9 sm:flex-col sm:gap-5 sm:rounded-lg">
            <div className="font-medium flex items-center gap-4">
              <p className="text-gray1">{property?.name}</p>
            </div>

            <div className="my-7 h-[0.0625rem] w-full bg-gray5" />

            <div className="text-2xl font-semibold flex items-center sm:justify-center">
              <p className="text-brand1">{priceFormatted}</p>
            </div>
          </div>

          <div className="w-full mt-9 flex flex-col gap-9 max-w-3xl">
            <section className="max-w-xl">
              <h2 className="text-2xl text-gray1 font-semibold leading-normal">
                {property?.name}
              </h2>
              <div className="mt-4 text-gray2 flex items-center gap-1">
                <IoLocationOutline />
                <p>
                  {property?.address}, {property?.city} - {property?.state}
                </p>
              </div>
            </section>

            <section className="text-gray1 leading-normal">
              <h3 className="text-xl  font-semibold ">Descrição do imóvel</h3>
              <p className="mt-5">{property?.description}</p>
            </section>

            <section className="text-gray1 leading-normal flex flex-col gap-3">
              <h3 className="text-xl  font-semibold ">Detalhes do imóvel</h3>
              <span>Á venda: {property?.isAvailable ? "Sim" : "Não"}</span>
            </section>
          </div>
        </main>
        <button
          className="bg-brand2 p-4 rounded-lg text-white font-semibold mt-8"
          onClick={() => {
            router.push(`/property/${propertyId}/new-contract`);
          }}
        >
          Novo Contrato
        </button>
      </Container>
    </>
  );
}

export default Property;
