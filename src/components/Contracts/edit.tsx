import { useRouter } from "next/router";
import Form from "../Form";
import FormTitle from "../Form/FormTitle";
import { Checkbox, FormLabel } from "@chakra-ui/react";
import FormInput from "../Form/FormInput";
import FormErrorText from "../Form/FormErrorText";
import Button from "../Button";
import { FormRegisterProps } from "../FormRegisterNewContract";
import formNewContract from "@/schemas/formNewContract";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IContract, useContractsStore } from "@/stores/contracts";
import useUserStore from "@/stores/user";
import React from "react";
import { toast } from "react-toastify";
import { dateFormat } from "@/utils/date-format";
import ModalDeleteContract from "./components/model-delete-contract";

function EditContract() {
  const router = useRouter();
  const [contract, setContract] = React.useState<IContract | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { updateContract, getContract, deleteContract } = useContractsStore();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormRegisterProps>({
    resolver: zodResolver(formNewContract),
  });

  const contractId = String(router.query.contractId);

  async function handleSubmitData(data: FormRegisterProps) {
    try {
      await updateContract({
        startDate: data.startDate,
        endDate: data.endDate,
        propertyId: contract?.propertyId,
        ownerId: contract?.ownerId,
        isActive: isActive,
        price: Number(data.price),
        tentantId: String(user?.id),
      });

      toast("Contrato atualizado", {
        type: "success",
        autoClose: 5000,
      });

      router.push("/contracts");
    } catch (error) {
      console.log(error);

      toast(
        "Houve algum erro. Tente novamente ou entre em contato com o suporte!",
        {
          type: "error",
          autoClose: 5000,
        }
      );
    }
  }

  async function handleContractDelete() {
    try {
      await deleteContract(contractId);

      toast("Contrato Excluído!", {
        type: "success",
        position: "top-center",
        autoClose: 5000,
      });

      router.push("/contracts");
    } catch (error) {
      console.log(error);

      toast(
        "Houve algum erro. Tente novamente ou entre em contato com o suporte!",
        {
          type: "error",
          position: "top-center",
          autoClose: 5000,
        }
      );
    }
  }

  const getContractByIdInDb = React.useCallback(async () => {
    const contractInDB = await getContract(contractId);

    setContract(contractInDB);
  }, [contractId, getContract]);

  const fillInFields = () => {
    const newStartDate = dateFormat(contract?.startDate || "");
    const newEndDate = dateFormat(contract?.endDate || "");

    setValue("startDate", newStartDate);
    setValue("endDate", newEndDate);
    setValue("isActive", contract?.isActive || false);
    setIsActive(contract?.isActive || false);
    setValue("price", String(contract?.price) || "");
  };

  React.useEffect(() => {
    if (contract !== null) {
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
      <FormInput id="startDate" register={register("startDate")} />
      {errors.startDate && (
        <FormErrorText>{errors.startDate.message}</FormErrorText>
      )}

      <FormLabel htmlFor="endDate">Data de Término</FormLabel>
      <FormInput id="endDate" register={register("endDate")} />
      {errors.endDate && (
        <FormErrorText>{errors.endDate.message}</FormErrorText>
      )}

      <FormLabel htmlFor="price">Valor</FormLabel>
      <FormInput id="price" register={register("price")} />
      {errors.price && <FormErrorText>{errors.price.message}</FormErrorText>}

      <div className="flex items-center">
        <FormLabel htmlFor="isActive">Ativo?</FormLabel>
        <Checkbox
          {...register("isActive")}
          isChecked={isActive}
          onChange={(e) => setIsActive(!isActive)}
          className="-mt-[0.45rem]"
        />
        {errors.isActive && (
          <FormErrorText>{errors.isActive.message}</FormErrorText>
        )}
      </div>

      <Button type="submit" className="w-[378px]">
        Enviar
      </Button>

      {user?.id === contract?.ownerId && (
        <ModalDeleteContract contractId={String(contract?.id)} />
      )}
    </Form>
  );
}

export default EditContract;
