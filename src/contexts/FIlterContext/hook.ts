import { useContext } from "react";
import { FilterPropertiesContext } from ".";

function useFilterProperties() {
  const context = useContext(FilterPropertiesContext);
  return context;
}

export default useFilterProperties;
