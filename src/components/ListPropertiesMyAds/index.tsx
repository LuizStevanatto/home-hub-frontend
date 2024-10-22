import CardPropertyMyAds from "./CardPropertyMyAds";
import useMyListProperties from "@/contexts/MyAdsListPropertiesContext/hook";

function ListPropertiesMyAds() {
  const { properties } = useMyListProperties();
  return (
    <ul className="py-4 rounded-lg flex flex-col sm:grid sm:grid-cols-3 gap-4">
      {properties.map((property) => (
        <CardPropertyMyAds key={property.id} property={property} />
      ))}
    </ul>
  );
}

export default ListPropertiesMyAds;
