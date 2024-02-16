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

type FormRegisterProps = z.infer<typeof formNewContract>;

function FormRegisterNewContract() {
  const router = useRouter();
  const { user } = useUserStore();
  const { createContract } = useContractsStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormRegisterProps>({
    resolver: zodResolver(formNewContract),
  });
  const propertyId = router.query.id;

  const handleCheckRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isActive", e.target.checked);
  };

  async function handleSubmitData(data: FormRegisterProps) {
    try {
      await createContract({
        startDate: data.startDate,
        endDate: data.endDate,
        propertyId: String(propertyId),
        isActive: data.isActive,
        price: data.price,
        tentantId: String(user?.id),
      });
    } catch (error) {
      console.log(error);
    }
  }

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

      <FormLabel htmlFor="isActive">Ativo?</FormLabel>
      <Checkbox {...register("isActive")} onChange={handleCheckRadio} />
      {errors.isActive && (
        <FormErrorText>{errors.isActive.message}</FormErrorText>
      )}

      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default FormRegisterNewContract;
