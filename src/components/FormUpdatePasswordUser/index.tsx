import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Button";
import Form from "../Form";
import FormInfoText from "../Form/FormInfoText";
import FormInput from "../Form/FormInput";
import FormLabel from "../Form/FormLabel";
import FormTitle from "../Form/FormTitle";
import api from "@/services/api";
import formUpdatePasswordUserSchema from "@/schemas/formUpdatePasswordUser";
import FormErrorText from "../Form/FormErrorText";

interface IFormUpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function FormUpdatePasswordUser() {
  const [isCurrentPasswordInvalid, setIsCurrentPasswordInvalid] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormUpdatePassword>({
    resolver: zodResolver(formUpdatePasswordUserSchema),
  });
  const router = useRouter();

  async function handleUpdatePassword(dataNewPassword: IFormUpdatePassword) {
    setIsLoading(true);

    try {
      await api.patch("/users/password", dataNewPassword);
      toast.success("Senha atualizada");
      router.replace("/");
    } catch (error) {
      if (isAxiosError(error)) {
        const msgErrorForCompare = "Password invalid";
        const msgAxios = error.response?.data.message;

        if (msgAxios == msgErrorForCompare) {
          setIsCurrentPasswordInvalid(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(handleUpdatePassword)}
      className="border border-gray5"
    >
      <FormTitle>Alteração de senha</FormTitle>
      <FormInfoText>
        Sempre escolha uma senha forte que você não esteja usando em nenhum
        outro lugar
      </FormInfoText>

      <FormLabel htmlFor="currentPassword">Senha atual</FormLabel>
      <FormInput
        id="currentPassword"
        type="password"
        placeholder="Informe sua senha atual"
        register={register("currentPassword")}
      />
      {errors.currentPassword && (
        <FormErrorText>{errors.currentPassword.message}</FormErrorText>
      )}

      <FormLabel htmlFor="newPassword">Nova senha</FormLabel>
      <FormInput
        id="newPassword"
        type="password"
        placeholder="Informe sua nova senha"
        register={register("newPassword")}
      />
      {errors.newPassword && (
        <FormErrorText>{errors.newPassword.message}</FormErrorText>
      )}

      <FormLabel htmlFor="confirmNewPassword">
        Confirme sua nova senha
      </FormLabel>
      <FormInput
        id="confirmNewPassword"
        type="password"
        placeholder="Informe novamente sua nova senha"
        register={register("confirmNewPassword")}
      />
      {errors.confirmNewPassword && (
        <FormErrorText>{errors.confirmNewPassword.message}</FormErrorText>
      )}

      {isCurrentPasswordInvalid && (
        <FormErrorText className="mt-6 mb-9 text-center">
          Senha atual inválida
        </FormErrorText>
      )}

      <Button type="submit" disabled={isLoading} className="mt-9 sm:w-[380px]">
        Alterar senha
      </Button>
    </Form>
  );
}

export default FormUpdatePasswordUser;
