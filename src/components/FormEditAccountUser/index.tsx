import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "@/stores/user";
import Form from "../Form";
import FormTitle from "../Form/FormTitle";
import FormInfoText from "../Form/FormInfoText";
import FormLabel from "../Form/FormLabel";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import formEditAccountUserSchema from "@/schemas/formEditAccountUser";
import FormErrorText from "../Form/FormErrorText";
import { toast } from "react-toastify";
import { z } from "zod";

type IFormEditAccountUser = z.infer<typeof formEditAccountUserSchema>;

function FormEditAccountUser() {
  const { user, setUser, updateUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormEditAccountUser>({
    resolver: zodResolver(formEditAccountUserSchema),
  });

  async function handleUpdateUser(dataUpdate: IFormEditAccountUser) {
    setIsLoading(true);

    try {
      await updateUser(dataUpdate);
      toast.success("Alterações feitas");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(handleUpdateUser)}
      className="border border-gray5"
      encType="multipart/form-data"
    >
      <FormTitle>Dados da sua conta</FormTitle>
      <FormInfoText>
        Aqui você pode adicionar foto de peril e alterar algumas informações
      </FormInfoText>

      <FormLabel htmlFor="firstName">Nome</FormLabel>
      <FormInput
        id="firstName"
        defaultValue={user?.name}
        register={register("firstName")}
      />
      {errors.firstName?.message && (
        <FormErrorText>{errors.firstName.message}</FormErrorText>
      )}

      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        id="email"
        defaultValue={user?.email}
        register={register("email")}
      />
      {errors.email?.message && (
        <FormErrorText>{errors.email.message}</FormErrorText>
      )}

      <Button type="submit" disabled={isLoading} className="mt-8">
        Salvar alterações
      </Button>
    </Form>
  );
}

export default FormEditAccountUser;
