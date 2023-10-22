import CardPropertyMyAds from "./CardPropertyMyAds";
import useMyListProperties from "@/contexts/MyAdsListPropertiesContext/hook";

function ListPropertiesMyAds() {
  const { properties } = useMyListProperties();
  return (
    <ul className="p-6 border border-gray5 rounded-lg flex flex-col gap-4">
      {properties.map((property) => (
        <CardPropertyMyAds key={property.id} property={property} />
      ))}
    </ul>
  );
}

export default ListPropertiesMyAds;
