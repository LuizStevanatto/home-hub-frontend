import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IProperty } from "@/pages";
import api from "@/services/api";

interface IFilterPropertiesProvider {
  children: ReactNode;
}

interface IFilterPropertiesContext {
  newPropertiesFiltered: IProperty[] | [];
}

interface IDataPropertyRequest {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  content: IProperty[];
}

export const FilterPropertiesContext = createContext(
  {} as IFilterPropertiesContext
);

function FilterPropertiesProvider({ children }: IFilterPropertiesProvider) {
  const [newPropertiesFiltered, setNewPropertiesFiltered] = useState<
    IProperty[] | []
  >([]);

  const router = useRouter();
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
  } = router.query;

  useEffect(() => {
    async function handleGetPropertiesFilter(): Promise<any> {
      try {
        const resp = await api.get(
          `/properties/filter?state=${state}&city=${city}&propertyType=${propertyType_0},${propertyType_1}&isSale=${isSale}&isInCondo=${isInCondo}&hasPoolProperty=${hasPoolProperty}&hasFurnitureProperty=${hasFurnitureProperty}&hasGrillProperty=${hasGrillProperty}&hasAirConditioningProperty=${hasAirConditioningProperty}`
        );
        const dataPropertiesRequest: IDataPropertyRequest = resp.data;
        setNewPropertiesFiltered(dataPropertiesRequest.content);
      } catch (error) {}
    }

    handleGetPropertiesFilter();
  }, [
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
  ]);

  return (
    <FilterPropertiesContext.Provider value={{ newPropertiesFiltered }}>
      {children}
    </FilterPropertiesContext.Provider>
  );
}

export default FilterPropertiesProvider;
