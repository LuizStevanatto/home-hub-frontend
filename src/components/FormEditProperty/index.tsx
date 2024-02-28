/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formPropertySchema from "@/schemas/formPropertySchema";
import Button from "../Button";
import FormErrorText from "../Form/FormErrorText";
import FormInput from "../Form/FormInput";
import FormLabel from "../Form/FormLabel";
import FormSelect from "../Form/FormSelect";
import FormTextarea from "../Form/FormTextarea";
import apiIbge from "@/services/apiIbge";
import { useRouter } from "next/router";
import { IProperty, usePropertyStore } from "@/stores/property";
import useUserStore from "@/stores/user";
import { toast } from "react-toastify";

interface IState {
  id: number;
  sigla: string;
  nome: string;
}

interface ICity {
  id: number;
  nome: string;
}

export function FormEditProperty() {
  const { user } = useUserStore();
  const [property, setProperty] = React.useState<IProperty | null>(null);
  const { updateProperty, getProperty } = usePropertyStore();
  const [states, setStates] = useState([] as IState[]);
  const [cities, setCities] = useState([] as ICity[]);
  const [ufState, setUfState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<null | HTMLFormElement>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IProperty>({
    resolver: zodResolver(formPropertySchema),
  });

  const propertyId = String(router.query.id);

  function handleGetUfState(e: ChangeEvent<HTMLSelectElement>) {
    const ufState = e.currentTarget.value;
    setUfState(ufState);
  }

  async function handleUpdateProperty(data: IProperty) {
    setIsLoading(true);

    try {
      await updateProperty({
        id: propertyId,
        country: data.country,
        zipCode: data.zipCode,
        state: data.state,
        city: data.city,
        address: data.address,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        ownerId: property?.ownerId,
      });

      toast("Propriedade atualizada com sucesso!", {
        position: "top-center",
        type: "success",
        autoClose: 5000,
      });

      await router.push(`/property/${String(user?.id)}`);
    } catch (error) {
      toast("Não foi possível alterar a propriedade!", {
        position: "top-center",
        autoClose: 5000,
        type: "error",
      });
    }

    setIsLoading(false);
  }

  const getPropertyInDb = async () => {
    const getPropertyById = await getProperty(propertyId);

    setProperty(getPropertyById);
  };

  const fillInFields = () => {
    setValue("zipCode", property?.zipCode || "");
    setValue("country", property?.country || "");
    setValue("state", property?.state || "");
    setUfState(property?.state || "");
    setValue("city", property?.city || "");
    setValue("address", property?.address || "");
    setValue("name", property?.name || "");
    setValue("description", property?.description || "");
    setValue("isAvailable", property?.isAvailable || false);
    setValue("price", Number(property?.price));
  };

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

  React.useEffect(() => {
    if (property) {
      fillInFields();
    }
  }, [property]);

  React.useEffect(() => {
    getPropertyInDb();
  }, []);

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleUpdateProperty)}
      className="mt-12 p-9 border border-gray5 rounded-lg"
      ref={formRef}
    >
      <div className="max-w-2xl">
        <FormLabel htmlFor="title">Título *</FormLabel>
        <FormInput
          id="title"
          defaultValue={property?.name}
          register={register("name")}
        />

        <FormLabel htmlFor="description">Descrição *</FormLabel>
        <FormTextarea
          id="description"
          defaultValue={property?.description}
          register={register("description")}
        />
        <FormErrorText>{errors.description?.message}</FormErrorText>

        <FormLabel htmlFor="price">Valor *</FormLabel>
        <FormInput
          id="price"
          defaultValue={property?.price}
          register={register("price")}
        />
        <FormErrorText>{errors.price?.message}</FormErrorText>

        <FormLabel htmlFor="country">País *</FormLabel>
        <FormInput
          id="country"
          defaultValue={property?.address}
          register={register("country")}
        />
        <FormErrorText>{errors.country?.message}</FormErrorText>

        <FormLabel htmlFor="zipCode">CEP *</FormLabel>
        <FormInput
          id="zipCode"
          defaultValue={property?.address}
          register={register("zipCode")}
        />
        <FormErrorText>{errors.zipCode?.message}</FormErrorText>

        <FormLabel htmlFor="state">Estado *</FormLabel>
        <FormSelect
          id="state"
          defaultValue={property?.state}
          onChange={(e) => {
            handleGetUfState(e);
            register("state").onChange(e);
          }}
          register={register("state")}
        >
          <option defaultValue={property?.state} disabled>
            Selecionar estado
          </option>
          {states.map((state) => (
            <option key={state.id} value={state.sigla}>
              {state.nome}
            </option>
          ))}
        </FormSelect>
        <FormErrorText>{errors.state?.message}</FormErrorText>

        <FormLabel htmlFor="city">Cidade *</FormLabel>
        <FormSelect
          id="city"
          defaultValue={property?.city}
          register={register("city")}
        >
          <option defaultValue={property?.city} disabled>
            Selecionar cidade
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </FormSelect>
        <FormErrorText>{errors.city?.message}</FormErrorText>

        <FormLabel htmlFor="address">Endereço *</FormLabel>
        <FormInput
          id="address"
          defaultValue={property?.address}
          register={register("address")}
        />
        <FormErrorText>{errors.address?.message}</FormErrorText>

        <Button type="submit" disabled={isLoading} className="mt-9">
          Alterar
        </Button>
      </div>
    </form>
  );
}
