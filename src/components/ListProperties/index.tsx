import { IProperty } from "@/pages";
import CardProperty from "./CardProperty";

interface IListProperties {
  properties: IProperty[];
}

function ListProperties({ properties }: IListProperties) {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,_1fr))] gap-6 md:grid-cols-[repeat(auto-fill,_minmax(368px,_1fr))] md:gap-7">
        {properties.map((property) => (
          <CardProperty key={property.id} property={property} />
        ))}
      </ul>
    </>
  );
}

export default ListProperties;
