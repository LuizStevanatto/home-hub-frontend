import { useContractsStore } from "@/stores/contracts";
import React from "react";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import { Checkbox, FormLabel } from "@chakra-ui/react";
import FormTitle from "../Form/FormTitle";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formNewContract from "@/schemas/formNewContract";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "@/stores/user";
import { useRouter } from "next/router";
import Button from "../Button";
import FormErrorText from "../Form/FormErrorText";
import { IProperty, usePropertyStore } from "@/stores/property";
import { toast } from "react-toastify";

export type FormRegisterProps = z.infer<typeof formNewContract>;

function FormRegisterNewContract() {
  const router = useRouter();
  const { user } = useUserStore();
  const { createContract } = useContractsStore();

  const [property, setProperty] = React.useState<IProperty | null>(null);
  const { getProperty } = usePropertyStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormRegisterProps>({
    resolver: zodResolver(formNewContract),
  });
  const propertyId = String(router.query.id);

  const handleCheckRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isActive", e.target.checked);
  };

  async function handleSubmitData(data: FormRegisterProps) {
    try {
      await createContract({
        startDate: data.startDate,
        endDate: data.endDate,
        propertyId: String(propertyId),
        ownerId: String(property?.ownerId),
        isActive: data.isActive,
        price: Number(data.price),
        tentantId: String(data.email),
      });

      toast("Contrato criado com sucesso!", {
        type: "success",
      });

      router.push("/contracts");
    } catch (error) {
      console.log(error);

      toast(
        "Não foi possível criar um contrato. Tente novamente ou entre em contato com o suporte!",
        {
          type: "error",
        }
      );
    }
  }

  const getPropertyInDb = async () => {
    const getPropertyById = await getProperty(propertyId);

    setProperty(getPropertyById);
  };

  React.useEffect(() => {
    getPropertyInDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitData)}
      className="border border-gray5 mt-4 flex flex-col gap-2"
      encType="multipart/form-data"
    >
      <FormTitle>Dados do Contrato</FormTitle>
      
      <FormLabel htmlFor="startDate">Data Inicial</FormLabel>
      <FormInput type="date" id="startDate" register={register("startDate")} />
      {errors.startDate && (
        <FormErrorText>{errors.startDate.message}</FormErrorText>
      )}

      <FormLabel htmlFor="endDate">Data de Término</FormLabel>
      <FormInput type="date" id="endDate" register={register("endDate")} />
      {errors.endDate && (
        <FormErrorText>{errors.endDate.message}</FormErrorText>
      )}

      <FormLabel htmlFor="price">Valor</FormLabel>
      <FormInput id="price" register={register("price")} />
      {errors.price && <FormErrorText>{errors.price.message}</FormErrorText>}

      {/* Novo campo de email */}
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput type="email" id="email" register={register("email")} />
      {errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}

      <div className="flex items-center">
        <FormLabel htmlFor="isActive">Ativo?</FormLabel>
        <Checkbox
          {...register("isActive")}
          onChange={handleCheckRadio}
          className="-mt-[0.45rem]"
        />
        {errors.isActive && (
          <FormErrorText>{errors.isActive.message}</FormErrorText>
        )}
      </div>

      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default FormRegisterNewContract;
