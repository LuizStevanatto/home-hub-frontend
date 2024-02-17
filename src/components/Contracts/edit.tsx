import { useRouter } from "next/router";
import Form from "../Form";
import FormTitle from "../Form/FormTitle";
import { Checkbox, FormLabel } from "@chakra-ui/react";
import FormInput from "../Form/FormInput";
import FormErrorText from "../Form/FormErrorText";
import Button from "../Button";
import { FormRegisterProps } from "../FormContract";
import formNewContract from "@/schemas/formNewContract";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IContract, useContractsStore } from "@/stores/contracts";
import useUserStore from "@/stores/user";
import React from "react";
import { toast } from "react-toastify";

function EditContract() {
  const router = useRouter();
  const [contract, setContract] = React.useState<IContract | null>(null);

  const { updateContract, getContract } = useContractsStore();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormRegisterProps>({
    resolver: zodResolver(formNewContract),
  });

  const contractId = router.query.contractId;

  const handleCheckRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isActive", e.target.checked);
  };

  async function handleSubmitData(data: FormRegisterProps) {
    try {
      await updateContract({
        id: String(contractId),
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        price: Number(data.price),
        tentantId: String(user?.id),
      });

      toast("Contrato atualizado", {
        type: "success",
        position: "top-center",
        autoClose: 5000,
      });

      router.push("/contracts");
    } catch (error) {
      console.log(error);

      toast("Houve algum erro", {
        type: "error",
        position: "top-center",
        autoClose: 5000,
      });
    }
  }

  const getContractByIdInDb = React.useCallback(async () => {
    const contractInDB = await getContract(String(contractId));

    setContract(contractInDB);
  }, [contractId, getContract]);

  const fillInFields = () => {
    setValue("startDate", contract?.startDate || "");
    setValue("endDate", contract?.endDate || "");
    setValue("isActive", contract?.isActive || false);
    setValue("price", String(contract?.price) || "");
  };

  React.useEffect(() => {
    if (contract) {
      fillInFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  React.useEffect(() => {
    getContractByIdInDb();
  }, [getContractByIdInDb]);

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitData)}
      className="border border-gray5 mt-4 flex flex-col gap-2"
      encType="multipart/form-data"
    >
      <FormTitle>Dados do Contrato</FormTitle>
      <FormLabel htmlFor="startDate">Data Inicial</FormLabel>
      <FormInput
        type="date"
        defaultValue={contract?.startDate}
        id="startDate"
        register={register("startDate")}
      />
      {errors.startDate && (
        <FormErrorText>{errors.startDate.message}</FormErrorText>
      )}

      <FormLabel htmlFor="endDate">Data de Término</FormLabel>
      <FormInput
        type="date"
        defaultValue={contract?.endDate}
        id="endDate"
        register={register("endDate")}
      />
      {errors.endDate && (
        <FormErrorText>{errors.endDate.message}</FormErrorText>
      )}

      <FormLabel htmlFor="price">Valor</FormLabel>
      <FormInput
        id="price"
        defaultValue={contract?.price}
        register={register("price")}
      />
      {errors.price && <FormErrorText>{errors.price.message}</FormErrorText>}

      <div className="flex items-center">
        <FormLabel htmlFor="isActive">Ativo?</FormLabel>
        <Checkbox
          {...register("isActive")}
          defaultChecked={contract?.isActive || true}
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

export default EditContract;
