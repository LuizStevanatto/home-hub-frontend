import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Banner from "@/components/Banner";
import Form from "@/components/Form";
import FormSelect from "@/components/Form/FormSelect";
import FormTitle from "@/components/Form/FormTitle";
import apiIbge from "@/services/apiIbge";
import Button from "../Button";
import useFilterProperties from "@/contexts/FIlterContext/hook";
import { IProperty } from "@/stores/property";

interface IBannerProperties {
  stateQuery: string | undefined;
  cityQuery: string | undefined;
  setProperties: Dispatch<SetStateAction<[] | IProperty[]>>;
}

interface IState {
  id: number;
  sigla: string;
  nome: string;
}

interface ICity {
  id: number;
  nome: string;
}

function BannerProperties({
  stateQuery,
  cityQuery,
  setProperties,
}: IBannerProperties) {
  const [states, setStates] = useState([] as IState[]);
  const [cities, setCities] = useState([] as ICity[]);
  const [ufState, setUfState] = useState("");
  const { newPropertiesFiltered } = useFilterProperties();
  const router = useRouter();

  useEffect(() => {
    handleGetAllStates();
    if (stateQuery) handleGetCitiesByStateQuery();
  }, []);

  useEffect(() => {
    async function handleGetCities() {
      try {
        const resp = await apiIbge.get(`/estados/${ufState}/municipios`);
        setCities(resp.data);
      } catch (error) {}
    }

    if (ufState) handleGetCities();
  }, [ufState]);

  async function handleGetCitiesByStateQuery() {
    try {
      const resp = await apiIbge.get(`/estados/${stateQuery}/municipios`);
      setCities(resp.data);
    } catch (error) {}
  }

  async function handleGetAllStates() {
    try {
      const resp = await apiIbge.get("/estados");
      const respStates: IState[] = resp.data;
      setStates(respStates);
    } catch (error) {}
  }

  function handleGetUfState(e: ChangeEvent<HTMLSelectElement>) {
    const ufState = e.currentTarget.value;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, state: ufState },
    });
    setUfState(ufState);
  }

  function handleCitySelected(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.currentTarget.value;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, city },
    });
  }

  function handleShowProperties(e: FormEvent) {
    e.preventDefault();
    setProperties(newPropertiesFiltered);
  }

  if (!states.length) {
    return null;
  }

  if (stateQuery && !cities.length) {
    return null;
  }

  return (
    <Banner>
      <Form
        onSubmit={handleShowProperties}
        className="p-6 w-full max-w-sm sm:max-w-max"
      >
        <FormTitle>Localização do imóvel</FormTitle>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <label>
            <FormSelect
              id="state"
              onChange={handleGetUfState}
              defaultValue={stateQuery || ""}
              className="sm:w-52"
            >
              <option value="" disabled>
                Selecionar estado
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.sigla}>
                  {state.nome}
                </option>
              ))}
            </FormSelect>
          </label>

          <label>
            <FormSelect
              id="city"
              onChange={handleCitySelected}
              defaultValue={cityQuery || ""}
              className="sm:w-52"
            >
              <option value="" disabled>
                Selecionar cidade
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </FormSelect>
          </label>

          <Button type="submit" className="max-w-max p-6">
            Buscar ({newPropertiesFiltered.length}){" "}
            {newPropertiesFiltered.length == 1 ? "imóvel" : "imóveis"}
          </Button>
        </div>
      </Form>
    </Banner>
  );
}

export default BannerProperties;
