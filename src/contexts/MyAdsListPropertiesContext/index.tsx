import { toast } from "react-toastify";
import { ReactNode, createContext, useEffect, useState } from "react";
import { IProperty } from "@/pages";
import { IDataPropertyRequest } from "@/pages/properties";
import api from "@/services/api";

interface IMyAdsListPropertiesContext {
  properties: IProperty[] | [];
  handleDeleteProperty: (propertyId: string) => Promise<void>;
  handleDisableProperty: (propertyId: string) => Promise<void>;
  handleEnableProperty: (propertyId: string) => Promise<void>;
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
  const [properties, setProperties] = useState<[] | IProperty[]>([]);

  async function handleDeleteProperty(propertyId: string) {
    try {
      await api.delete(`/properties/${propertyId}`);
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

  async function handleDisableProperty(propertyId: string) {
    try {
      await api.patch(`/properties/deactivate/${propertyId}`);
      const propertiesWithUpdated = properties.map((property) => {
        if (property.id == propertyId) {
          return {
            ...property,
            isActive: false,
          };
        }

        return property;
      });

      setProperties(propertiesWithUpdated);
      toast.success("Anúncio desativado");
    } catch (error) {
    } finally {
      return;
    }
  }

  async function handleEnableProperty(propertyId: string) {
    try {
      await api.patch(`/properties/activate/${propertyId}`);
      const propertiesWithUpdated = properties.map((property) => {
        if (property.id == propertyId) {
          return {
            ...property,
            isActive: true,
          };
        }
        return property;
      });

      setProperties(propertiesWithUpdated);
      toast.success("Anúncio ativado");
    } catch (error) {
    } finally {
      return;
    }
  }

  useEffect(() => {
    async function handleGetPropertiesUser() {
      try {
        const resp = await api.get("/properties/user");
        const dataRequest: IDataPropertyRequest = resp.data;
        setProperties(dataRequest.content);
      } catch (error) {}
    }

    handleGetPropertiesUser();
  }, []);

  return (
    <MyAdsListPropertiesContext.Provider
      value={{
        properties,
        handleDeleteProperty,
        handleDisableProperty,
        handleEnableProperty,
      }}
    >
      {children}
    </MyAdsListPropertiesContext.Provider>
  );
}

export default MyAdsListPropertiesProvider;
