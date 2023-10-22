import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formPropertySchema from "@/schemas/formPropertySchema";
import api from "@/services/api";
import {
  handleCreateMuskCurrency,
  handleMaskPhoneInput,
} from "@/utils/inputMaskPhone";
import Button from "../Button";
import FormErrorText from "../Form/FormErrorText";
import FormFieldPhoto from "../Form/FormFieldPhoto";
import FormInput from "../Form/FormInput";
import FormInputRadio from "../Form/FormInputRadio";
import FormLabel from "../Form/FormLabel";
import FormSelect from "../Form/FormSelect";
import FormTextarea from "../Form/FormTextarea";
import apiIbge from "@/services/apiIbge";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface IFormAddProperty {
  title: string;
  description: string;
  numberRooms: number;
  numberBathrooms: number;
  numberGarage: number;
  propertyType: string;
  isSale: boolean;
  isInCondo: boolean;
  hasPoolProperty: boolean;
  hasAirConditioningProperty: boolean;
  hasGrillProperty: boolean;
  hasFurnitureProperty: boolean;
  hasPollCondo: boolean;
  hasSecurity24hCondo: boolean;
  hasGymCondo: boolean;
  hasPartyHallCondo: boolean;
  price: string;
  priceCondo: string;
  isCondoPriceIncluded: boolean;
  state: string;
  city: string;
  contact: string;
  isDisplayContact: boolean;
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

interface INewProperty {
  id: string;
}

function FormAddProperty() {
  const [isInCondo, setIsInCondo] = useState(false);
  const [isSale, setIsSale] = useState(true);
  const [states, setStates] = useState([] as IState[]);
  const [cities, setCities] = useState([] as ICity[]);
  const [ufState, setUfState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<null | HTMLFormElement>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormAddProperty>({
    resolver: zodResolver(formPropertySchema),
  });

  useEffect(() => {
    async function handleGetAllStates() {
      try {
        const resp = await apiIbge.get("/estados");
        const respStates: IState[] = resp.data;
        setStates(respStates);
      } catch (error) {}
    }

    handleGetAllStates();
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

  function handleGetUfState(e: ChangeEvent<HTMLSelectElement>) {
    const ufState = e.currentTarget.value;
    setUfState(ufState);
  }

  const numbers = Object.keys(new Array(8).fill(null)).map(Number);
  const optionsNumbers = numbers.map((number: number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  function handleGetPhotos() {
    const inputsFile = formRef.current!.getElementsByClassName(
      "photo"
    ) as HTMLCollectionOf<HTMLInputElement>;

    const arrayInputsFile = Array.from(inputsFile);
    const formData = new FormData();

    arrayInputsFile.forEach((input) => {
      const photo = input.files![0];

      if (photo) {
        formData.append("photo", photo);
      }
    });

    return formData;
  }

  async function handleAddPhotos(propertyId: string) {
    const photos = handleGetPhotos();
    try {
      await api.post(`/properties/photos/${propertyId}`, photos);
      toast.success("Imóvel anunciado");
      router.push("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddProperty(data: IFormAddProperty) {
    setIsLoading(true);

    try {
      const resp = await api.post("/properties", data);
      const newProperty: INewProperty = resp.data;
      handleAddPhotos(newProperty.id);
    } catch (error) {}
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleAddProperty)}
      className="mt-12 p-9 border border-gray5 rounded-lg"
      ref={formRef}
    >
      <div className="max-w-2xl">
        <FormLabel htmlFor="title">Título*</FormLabel>
        <FormInput id="title" register={register("title")} />
        <FormErrorText>{errors.title?.message}</FormErrorText>

        <FormLabel htmlFor="description">Descrição*</FormLabel>
        <FormTextarea id="description" register={register("description")} />
        <FormErrorText>{errors.description?.message}</FormErrorText>

        <FormLabel htmlFor="numberRooms">Número de quartos*</FormLabel>
        <FormSelect
          id="numberRooms"
          defaultValue=""
          register={register("numberRooms")}
        >
          <option value="" disabled>
            Selecione
          </option>
          {...optionsNumbers}
        </FormSelect>
        <FormErrorText>{errors.numberRooms?.message}</FormErrorText>

        <FormLabel htmlFor="numberBathrooms">Número de banheiros*</FormLabel>
        <FormSelect
          id="numberBathrooms"
          defaultValue=""
          register={register("numberBathrooms")}
        >
          <option value="" disabled>
            Selecione
          </option>
          {...optionsNumbers}
        </FormSelect>
        <FormErrorText>{errors.numberBathrooms?.message}</FormErrorText>

        <FormLabel htmlFor="numberGarage">Vagas na garagem*</FormLabel>
        <FormSelect
          id="numberGarage"
          defaultValue=""
          register={register("numberGarage")}
        >
          <option value="" disabled>
            Selecione
          </option>
          {...optionsNumbers}
        </FormSelect>
        <FormErrorText>{errors.numberGarage?.message}</FormErrorText>

        <p className="mt-3 mb-1 text-gray1 font-medium">Tipo de imóvel</p>
        <div className="flex items-center gap-4">
          <FormInputRadio
            textInput="Casa"
            value="Casa"
            defaultChecked
            register={register("propertyType")}
          />
          <FormInputRadio
            textInput="Apartamento"
            value="Apartamento"
            register={register("propertyType")}
          />
        </div>

        <p className="mt-3 mb-1 text-gray1 font-medium">
          Você que vender ou alugar
        </p>
        <div className="flex items-center gap-4">
          <div onClick={() => setIsSale(true)}>
            <FormInputRadio
              textInput="Vender"
              defaultChecked
              value={"true"}
              register={register("isSale")}
            />
          </div>
          <div onClick={() => setIsSale(false)}>
            <FormInputRadio
              textInput="Alugar"
              value={"false"}
              register={register("isSale")}
            />
          </div>
        </div>

        <p className="mt-3 mb-1 text-gray1 font-medium">
          O imóvel é em condomínio
        </p>
        <div className="flex items-center gap-4">
          <div onClick={() => setIsInCondo(false)}>
            <FormInputRadio
              textInput="Não"
              defaultChecked
              value={"false"}
              register={register("isInCondo")}
            />
          </div>
          <div onClick={() => setIsInCondo(true)}>
            <FormInputRadio
              textInput="Sim"
              value={"true"}
              register={register("isInCondo")}
            />
          </div>
        </div>

        <div className="mt-4 text-gray1">
          <p className="mt-3 mb-1 font-medium">Detalhes do imóvel</p>
          <div className="grid grid-cols-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("hasPoolProperty")}
                className="accent-brand1 w-4 h-4"
              />
              Piscina
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("hasAirConditioningProperty")}
                className="accent-brand1 w-4 h-4"
              />
              Ar Condicionado
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("hasGrillProperty")}
                className="accent-brand1 w-4 h-4"
              />
              Churrasqueira
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("hasFurnitureProperty")}
                className="accent-brand1 w-4 h-4"
              />
              Mobiliado
            </label>
          </div>
        </div>

        {isInCondo && (
          <div className="mt-4 text-gray1">
            <p className="mt-3 mb-1 font-medium">Detalhes do condomínio</p>
            <div className="grid grid-cols-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("hasPollCondo")}
                  className="accent-brand1 w-4 h-4"
                />
                Piscina
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("hasSecurity24hCondo")}
                  className="accent-brand1 w-4 h-4"
                />
                Segurança 24 horas
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("hasGymCondo")}
                  className="accent-brand1 w-4 h-4"
                />
                Academia
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("hasPartyHallCondo")}
                  className="accent-brand1 w-4 h-4"
                />
                Salão de festa
              </label>
            </div>
          </div>
        )}

        <FormLabel htmlFor="price">Preço (R$){!isSale && "/Mês"}*</FormLabel>
        <FormInput
          id="price"
          onKeyUp={handleCreateMuskCurrency}
          maxLength={17}
          register={register("price")}
        />
        <FormErrorText>{errors.price?.message}</FormErrorText>

        {isInCondo && (
          <>
            <FormLabel htmlFor="priceCondo">
              Preço do condomínio (R$)/Mês*
            </FormLabel>
            <FormInput
              id="priceCondo"
              onKeyUp={handleCreateMuskCurrency}
              maxLength={17}
              register={register("priceCondo")}
            />
            <FormErrorText>{errors.priceCondo?.message}</FormErrorText>

            {!isSale && (
              <label className="mt-2 text-gray1 flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("isCondoPriceIncluded")}
                  className="accent-brand1 w-4 h-4"
                />
                Valor do condomíno incluso
              </label>
            )}
          </>
        )}

        <div className="mt-6 mb-6">
          <p className="font-medium">Fotos*</p>
          <p className="mb-3 text-xs text-gray3">
            Adicione <span className="font-semibold">pelo menos 1 foto</span>,
            você pode adicionar
            <span className="font-semibold"> até 3 fotos</span>
          </p>

          <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-4">
            <FormFieldPhoto />
            <FormFieldPhoto />
            <FormFieldPhoto />
          </div>
        </div>

        <FormLabel htmlFor="state">Estado*</FormLabel>
        <FormSelect
          id="state"
          defaultValue=""
          onChange={(e) => {
            handleGetUfState(e);
            register("state").onChange(e);
          }}
          register={register("state")}
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
        <FormErrorText>{errors.state?.message}</FormErrorText>

        <FormLabel htmlFor="city">Cidade*</FormLabel>
        <FormSelect id="city" defaultValue="" register={register("city")}>
          <option value="" disabled>
            Selecionar cidade
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </FormSelect>
        <FormErrorText>{errors.city?.message}</FormErrorText>

        <FormLabel htmlFor="contact">Celular para contato*</FormLabel>
        <FormInput
          id="contact"
          type="tel"
          onKeyUp={handleMaskPhoneInput}
          maxLength={15}
          register={register("contact")}
        />
        <FormErrorText>{errors.contact?.message}</FormErrorText>

        <label className="mt-2 text-gray1 flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isDisplayContact")}
            className="accent-brand1 w-4 h-4"
            defaultChecked
          />
          Exibir meu número de celular no anúncio
        </label>

        <p className="mt-9 text-sm text-gray3">
          As informações com (*) são obrigatórias
        </p>
        <Button type="submit" disabled={isLoading} className="mt-9">
          Anunciar
        </Button>
      </div>
    </form>
  );
}

export default FormAddProperty;
