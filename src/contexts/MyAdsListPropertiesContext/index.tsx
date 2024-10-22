import { toast } from "react-toastify";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IProperty, usePropertyStore } from "@/stores/property";

interface IMyAdsListPropertiesContext {
  properties: IProperty[] | [];
  handleDeleteProperty: (propertyId: string) => Promise<void>;
}

interface IMyAdsListPropertiesProvider {
  children: ReactNode;
}

export const MyAdsListPropertiesContext = createContext(
  {} as IMyAdsListPropertiesContext
);

function MyAdsListPropertiesProvider({
  children,
}: IMyAdsListPropertiesProvider) {
  const { getProperties, deleteProperty } = usePropertyStore();
  const [properties, setProperties] = useState<[] | IProperty[]>([]);

  async function handleDeleteProperty(propertyId: string) {
    try {
      await deleteProperty(propertyId);
      const propertiesWithoutDeleted = properties.filter(
        ({ id }) => id != propertyId
      );
      setProperties(propertiesWithoutDeleted);
      toast.success("Anúncio excluído");
    } catch (error) {
    } finally {
      return;
    }
  }

  const handleGetPropertiesUser = useCallback(async () => {
    try {
      const properties: IProperty[] = await getProperties();

      setProperties(properties);
    } catch (error) {
      console.log(error);
    }
  }, [getProperties]);

  useEffect(() => {
    handleGetPropertiesUser();
  }, [handleGetPropertiesUser]);

  return (
    <MyAdsListPropertiesContext.Provider
      value={{
        properties,
        handleDeleteProperty,
      }}
    >
      {children}
    </MyAdsListPropertiesContext.Provider>
  );
}

export default MyAdsListPropertiesProvider;
