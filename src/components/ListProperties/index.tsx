import React from "react";
import CardProperty from "./CardProperty";
import { IProperty, usePropertyStore } from "@/stores/property";

function ListProperties() {
  const [properties, setProperties] = React.useState<IProperty[] | null>(null);
  const { getProperties } = usePropertyStore();

  const getPropertiesInDb = React.useCallback(async () => {
    const propertiesList = await getProperties();

    setProperties(propertiesList);
  }, [getProperties]);

  React.useEffect(() => {
    getPropertiesInDb();
  }, [getPropertiesInDb]);

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,_1fr))] gap-6 md:grid-cols-[repeat(auto-fill,_minmax(368px,_1fr))] md:gap-7">
        {properties?.map((property) => (
          <CardProperty key={property.id} property={property} />
        ))}
      </ul>
    </>
  );
}

export default ListProperties;
