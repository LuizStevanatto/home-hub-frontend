import { useContext } from "react";
import { MyAdsListPropertiesContext } from ".";

function useMyAdsListProperties() {
  const context = useContext(MyAdsListPropertiesContext);
  return context;
}

export default useMyAdsListProperties;
