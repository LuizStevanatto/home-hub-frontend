import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ListProperties from "@/components/ListProperties";
import Container from "@/components/Conateiner";
import api from "@/services/api";
import Footer from "@/components/Footer";
import Link from "next/link";
import Head from "next/head";

interface IPropertyPhoto {
  photoUrl: string;
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  numberRooms: number;
  numberBathrooms: number;
  numberGarage: number;
  propertyType: string;
  isSale: boolean;
  isInCondo: boolean;
  hasPoolProperty: boolean;
  hasAirConditioningProperty: boolean;
  hasGrillProperty: boolean;
  hasFurnitureProperty: boolean;
  hasPollCondo: boolean;
  hasSecurity24hCondo: boolean;
  hasGymCondo: boolean;
  hasPartyHallCondo: boolean;
  price: number;
  priceCondo: number;
  isCondoPriceIncluded: boolean;
  state: string;
  city: string;
  isDisplayContact: boolean;
  isActive: boolean;
  viewsCounter: number;
  photos: IPropertyPhoto[];
  contact?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [propertiesRecents, setPropertiesRecents] = useState<[] | IProperty[]>(
    []
  );
  const [propertiesInHight, setPropertiesInHight] = useState<[] | IProperty[]>(
    []
  );

  useEffect(() => {
    async function handleGetAllRecents() {
      try {
        const resp = await api.get("/properties", {
          params: {
            page: 1,
            limit: 8,
          },
        });
        const data: IProperty[] = resp.data.content;
        setPropertiesRecents(data);
      } catch (error) {}
    }

    async function handleGetAllInHight() {
      try {
        const resp = await api.get("/properties/inHigh", {
          params: {
            page: 1,
            limit: 8,
          },
        });
        const data: IProperty[] = resp.data.content;
        setPropertiesInHight(data);
      } catch (error) {}
    }

    handleGetAllRecents();
    handleGetAllInHight();
  }, []);

  return (
    <>
      <Head>
        <title>Alguns imóveis</title>
      </Head>
      <Header />
      <Banner>
        {" "}
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
      <main>
        <Container>
          <section className="mt-[3.125rem]">
            <h2 className="mb-[1.875rem] text-xl text-gray1 font-semibold">
              Anúncios recentes
            </h2>

            <ListProperties properties={propertiesRecents} />
          </section>

          <section className="mt-[3.125rem]">
            <h2 className="mb-[1.875rem] text-xl text-gray1 font-semibold">
              Anúncios em alta
            </h2>

            <ListProperties properties={propertiesInHight} />
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
