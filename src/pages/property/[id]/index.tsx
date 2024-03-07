import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

import Container from "@/components/Conateiner";
import { IProperty, usePropertyStore } from "@/stores/property";
import { LayoutRoot } from "@/layout/root";
import { toast } from "react-toastify";
export default function Property() {
  const { getProperty, deleteProperty } = usePropertyStore();
  const [property, setProperty] = useState<IProperty | null>(null);
  const router = useRouter();
  const propertyId = String(router.query.id);

  const getPropertyInDb = React.useCallback(async () => {
    const getPropertyById = await getProperty(String(propertyId));

    setProperty(getPropertyById);
  }, [getProperty, propertyId]);

  React.useEffect(() => {
    getPropertyInDb();
  }, [getPropertyInDb]);

  function handleFormattedCurrency(value: number | undefined) {
    if (value == undefined) return null;
    return value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
      maximumFractionDigits: 0,
    });
  }

  async function handleDeleteProperty() {
    try {
      await deleteProperty(propertyId);

      toast("Propriedade deletada com sucesso!", {
        position: "top-center",
        type: "success",
        autoClose: 5000,
      });

      router.push("/");
    } catch (error) {
      console.log(error);

      toast(
        "Não foi possível deletar a propriedade. Tente novamente ou entre em contato com o suporte!",
        {
          position: "top-center",
          type: "error",
          autoClose: 5000,
        }
      );
    }
  }

  const priceFormatted = handleFormattedCurrency(property?.price);

  return (
    <>
      <Head>
        <title>Propriedade</title>
      </Head>

      <Container className="mt-12">
        <main className="flex flex-col  sm:items-center sm:gap-5 border-2 border-gray-300 rounded-[8px] p-4 max-w-[580px]">

          <div className="w-full mt-2 flex flex-col gap-4 max-w-3xl">
            <section className="max-w-xl">
              <h2 className="text-2xl text-gray1 font-semibold leading-normal">
                {property?.name}
              </h2>
              <div className="mt-4 text-gray2 flex items-center gap-1">
                <IoLocationOutline/>
                <p>
                  {property?.address}, {property?.city} - {property?.state}
                </p>
              </div>
            </section>

            <section className="text-gray1 leading-normal">
              <h3 className="text-xl text-brand1 font-semibold ">Descrição do imóvel</h3>
              <p className="mt-5">{property?.description}</p>
            </section>

            <section className="text-gray1 leading-normal flex flex-col gap-3">
              <h3 className="text-xl text-brand1 font-semibold ">Detalhes do imóvel</h3>

              <p>Valor: <strong>{priceFormatted}</strong></p>
              <span>Á venda: <strong>{property?.isAvailable ? "Não" : "Sim"}</strong></span>
            </section>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-2">
            <button
                className="bg-brand2 p-4 rounded-lg text-white font-semibold mt-8"
                onClick={() => {
                  router.push(`/property/${propertyId}/edit-property`);
                }}
            >
              Editar propriedade
            </button>

            {!property?.isAvailable && (
                <button
                    className="bg-brand2 p-4 rounded-lg text-white font-semibold mt-8"
                    onClick={() => {
                      router.push(`/property/${propertyId}/new-contract`);
                    }}
                >
                  Novo Contrato
                </button>
            )}

            <button
                className="bg-red-500 hover:bg-red-600 p-4 rounded-lg text-white font-semibold mt-8"
                onClick={handleDeleteProperty}
            >
              Deletar Contrato
            </button>
          </div>

        </main>

      </Container>
    </>
  );
}

Property.Layout = LayoutRoot;
