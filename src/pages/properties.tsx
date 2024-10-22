import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import BannerProperties from "@/components/BannerProperties";
import FilterProperties from "@/components/FilterProperties";
import ListProperties from "@/components/ListProperties";
import Container from "@/components/Conateiner";
import FilterProvider from "@/contexts/FIlterContext";
import { IProperty } from "@/stores/property";
import FormRegister from "@/components/FormRegister";
import Footer from "@/components/Footer";

export interface IDataPropertyRequest {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  content: IProperty[];
}

interface IServerSidePropsQuery {
  state?: string;
  city?: string;
  propertyType_0?: string;
  propertyType_1?: string;
  isSale?: string;
  isInCondo?: string;
  hasPoolProperty?: string;
  hasFurnitureProperty?: string;
  hasGrillProperty?: string;
  hasAirConditioningProperty?: string;
}

interface IProperties {
  serverSidePropsQuery: IServerSidePropsQuery;
}

function Properties({ serverSidePropsQuery }: IProperties) {
  const [, setProperties] = useState<[] | IProperty[]>([]);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Encontre seu imóvel</title>
      </Head>
      <FilterProvider>
        <main className="flex-grow">
          <BannerProperties
            setProperties={setProperties}
            stateQuery={serverSidePropsQuery.state}
            cityQuery={serverSidePropsQuery.city}
          />
          <FilterProperties setProperties={setProperties} />
          <Container>
            <ListProperties />
          </Container>
        </main>
      </FilterProvider>
      <Footer />
    </div>
  );
}

export default Properties;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    state,
    city,
    propertyType_0,
    propertyType_1,
    isSale,
    isInCondo,
    hasPoolProperty,
    hasFurnitureProperty,
    hasGrillProperty,
    hasAirConditioningProperty,
  } = context.query;

  const serverSidePropsQuery = {
    ...(state && { state }),
    ...(city && { city }),
    ...(propertyType_0 && { propertyType_0: "casa" }),
    ...(propertyType_1 && { propertyType_1: "apartamento" }),
    ...(isSale && { isSale }),
    ...(isInCondo && { isInCondo }),
    ...(hasPoolProperty && { hasPoolProperty }),
    ...(hasFurnitureProperty && { hasFurnitureProperty }),
    ...(hasGrillProperty && { hasGrillProperty }),
    ...(hasAirConditioningProperty && { hasAirConditioningProperty }),
  };

  return { props: { serverSidePropsQuery } };
}
