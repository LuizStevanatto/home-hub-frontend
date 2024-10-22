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
import {Checkbox} from "@chakra-ui/react";

interface IState {
  id: number;
  sigla: string;
  nome: string;
}

interface ICity {
  id: number;
  nome: string;
}

function FormAddProperty() {
  const { user } = useUserStore();
  const { createProperty } = usePropertyStore();
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
  } = useForm<IProperty>({
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

  async function handleAddProperty(data: IProperty) {
    setIsLoading(true);

    try {
      await createProperty({
        ...data,
        price: Number(data.price),
        ownerId: String(user?.id),
      });

      await router.push("/");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleAddProperty)}
      className="mt-6 rounded-lg"
      ref={formRef}
    >
      <div className="max-w-2xl">
        <FormLabel htmlFor="title">Título*</FormLabel>
        <FormInput id="title" register={register("name")}/>
        <FormErrorText>{errors.name?.message}</FormErrorText>

        <FormLabel htmlFor="description">Descrição *</FormLabel>
        <FormTextarea id="description" register={register("description")}/>
        <FormErrorText>{errors.description?.message}</FormErrorText>

        <section className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <div>
            <FormLabel htmlFor="number">Número *</FormLabel>
            <FormInput id="number" register={register("number")}/>
            <FormErrorText>{errors.number?.message}</FormErrorText>
          </div>

          <div>
            <FormLabel htmlFor="price">Valor *</FormLabel>
            <FormInput id="price" register={register("price")}/>
            <FormErrorText>{errors.price?.message}</FormErrorText>
          </div>
        </section>

        <section className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <div>
            <FormLabel htmlFor="country">País *</FormLabel>
            <FormInput id="country" register={register("country")}/>
            <FormErrorText>{errors.country?.message}</FormErrorText>
          </div>

          <div>
            <FormLabel htmlFor="zipCode">CEP *</FormLabel>
            <FormInput id="zipCode" register={register("zipCode")}/>
            <FormErrorText>{errors.zipCode?.message}</FormErrorText>
          </div>
        </section>

        <section className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <div>
            <FormLabel htmlFor="state">Estado *</FormLabel>
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
          </div>

          <div>
            <FormLabel htmlFor="city">Cidade *</FormLabel>
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
          </div>
        </section>

        <section className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <div>
            <FormLabel htmlFor="address">Endereço *</FormLabel>
            <FormInput id="address" register={register("address")}/>
            <FormErrorText>{errors.address?.message}</FormErrorText>
          </div>

            <div className="flex items-center gap-4">
              <FormLabel htmlFor="isAvailable">Disponível para negociar:</FormLabel>
              <Checkbox
                  {...register('isAvailable')}
                  // isChecked={isAvaliable}
                  // onChange={(e) => setIsAvaliable(!isAvaliable)}
                  className='mt-3'
              />
              <FormErrorText>{errors.isAvailable?.message}</FormErrorText>
            </div>
          </section>

        <Button type="submit" disabled={isLoading} className="mt-9 sm:w-[380px]">
          Anunciar
        </Button>
      </div>
    </form>
);
}

export default FormAddProperty;
