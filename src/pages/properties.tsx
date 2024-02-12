import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import BannerProperties from "@/components/BannerProperties";
import FilterProperties from "@/components/FilterProperties";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import api from "@/services/api";
import ListProperties from "@/components/ListProperties";
import Container from "@/components/Conateiner";
import FilterProvider from "@/contexts/FIlterContext";
import { IProperty } from "@/stores/property";

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
    <>
      <Head>
        <title>Encontre seu imóvel</title>
      </Head>
      <Header />
      <FilterProvider>
        <BannerProperties
          setProperties={setProperties}
          stateQuery={serverSidePropsQuery.state}
          cityQuery={serverSidePropsQuery.city}
        />
        <FilterProperties setProperties={setProperties} />
        <Container>
          <ListProperties />
        </Container>
      </FilterProvider>
      <Footer />
    </>
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
