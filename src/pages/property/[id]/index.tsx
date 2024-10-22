import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

import Container from "@/components/Conateiner";
import { IProperty, usePropertyStore } from "@/stores/property";
import { LayoutRoot } from "@/layout/root";
import useUserStore from "@/stores/user";
import { IContract, useContractsStore } from "@/stores/contracts";
import { dateFormat } from "@/utils/date-format";
import Footer from "@/components/Footer";

export default function Property() {
  const { user } = useUserStore();
  const { getProperty } = usePropertyStore();
  const { getPropertyContracts } = useContractsStore();
  const [property, setProperty] = useState<IProperty | null>(null);
  const [propertyContracts, setPropertyContracts] = useState<
    IContract[] | null
  >(null);
  const router = useRouter();
  const propertyId = String(router.query.id);

  const getPropertyInDb = React.useCallback(async () => {
    const getPropertyById = await getProperty(propertyId);
    const getContractsPropertyById = await getPropertyContracts(propertyId);

    setProperty(getPropertyById);
    setPropertyContracts(getContractsPropertyById);
  }, [getProperty, getPropertyContracts, propertyId]);

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

  const priceFormatted = handleFormattedCurrency(property?.price);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Propriedade</title>
      </Head>

      <main className="flex-grow">
        <Container className="mt-12 flex flex-col sm:flex-row gap-6">
          <main className="flex flex-col sm:w-[420px] sm:items-center sm:gap-5 bg-neutral-300 rounded-[8px] p-4 space-y-6 sm:space-y-0">
            <div className="w-full mt-2 flex flex-col gap-4 max-w-3xl">
              <section className="max-w-xl">
                <h2 className="text-2xl text-gray1 font-semibold leading-normal">
                  {property?.name}
                </h2>
                <div className="mt-4 text-black flex items-center gap-1">
                  <IoLocationOutline />
                  <p>
                    {property?.address}, {property?.city} - {property?.state}
                  </p>
                </div>
              </section>

              <section className="text-gray1 leading-normal">
                <h3 className="text-xl text-brand1 font-semibold ">
                  Descrição do imóvel
                </h3>
                <p className="mt-5">{property?.description}</p>
              </section>

              <section className="text-gray1 leading-normal flex flex-col gap-3">
                <h3 className="text-xl text-brand1 font-semibold ">
                  Detalhes do imóvel
                </h3>

                <p>
                  País: <strong>{property?.country}</strong>
                </p>

                <p>
                  Estado: <strong>{property?.state}</strong>
                </p>

                <p>
                  Cidade: <strong>{property?.city}</strong>
                </p>

                <p>
                  Endereço: <strong>{property?.address}</strong>
                </p>

                <p>
                  Valor: <strong>{priceFormatted}</strong>
                </p>
                <span>
                  Á venda:{" "}
                  <strong>{property?.isAvailable ? "Sim" : "Não"}</strong>
                </span>
              </section>
            </div>

            <div className="flex flex-col sm:justify-start sm:gap-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                {user?.id === property?.ownerId && (
                  <>
                    <button
                      className="bg-brand2 hover:bg-brand1 p-4 rounded-lg text-white font-semibold mt-8"
                      onClick={() => {
                        router.push(`/property/${propertyId}/edit-property`);
                      }}
                    >
                      Editar propriedade
                    </button>
                  </>
                )}

                {property?.isAvailable && (
                  <button
                    className="bg-green-600 hover:bg-green-700 p-4 rounded-lg text-white font-semibold mt-8"
                    onClick={() => {
                      router.push(`/property/${propertyId}/new-contract`);
                    }}
                  >
                    Novo Contrato
                  </button>
                )}
              </div>
            </div>
          </main>

          {propertyContracts && propertyContracts.length > 0 && (
            <>
              <div className="flex flex-col gap-2 p-4 bg-neutral-300 max-h-[336px] w-full sm:w-[420px] sm:max-h-[572px] overflow-y-auto rounded-[8px] space-y-4">
                <h3 className="text-xl mt-2  text-brand1 font-semibold ">
                  Outros contratos dessa propriedade
                </h3>

                {propertyContracts.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <span>
                        Data de início:{" "}
                        <strong>{dateFormat(item.startDate)}</strong>
                      </span>
                      <span>
                        Data de Término:{" "}
                        <strong>{dateFormat(item.endDate)}</strong>
                      </span>
                      <span>
                        Valor:{" "}
                        <strong>{handleFormattedCurrency(item.price)}</strong>
                      </span>

                      <span>
                        Situação:{" "}
                        <strong>{item.isActive ? "Ativo" : "Encerrado"}</strong>
                      </span>

                      <div className="border border-gray-400 mt-3" />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

Property.Layout = LayoutRoot;
