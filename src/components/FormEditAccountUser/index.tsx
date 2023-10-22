import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import useUserStore from "@/stores/user";
import Form from "../Form";
import FormTitle from "../Form/FormTitle";
import FormInfoText from "../Form/FormInfoText";
import FormLabel from "../Form/FormLabel";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import formEditAccountUserSchema from "@/schemas/formEditAccountUser";
import FormErrorText from "../Form/FormErrorText";
import api from "@/services/api";
import { toast } from "react-toastify";

interface IFormEditAccountUser {
  firstName: string;
  lastName: string;
  email: string;
}

function FormEditAccountUser() {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const tagImgRef = useRef<null | HTMLImageElement>(null);
  const inputAvatarRef = useRef<null | HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormEditAccountUser>({
    resolver: zodResolver(formEditAccountUserSchema),
  });

  function handleFileAvatar(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;

    if (!input.files?.length) return;

    const reader = new FileReader();
    reader.onload = function () {
      if (tagImgRef.current) {
        tagImgRef.current.src = String(reader.result);
        tagImgRef.current.classList.remove("w-9", "h-9");
        tagImgRef.current.classList.add("w-full", "h-full", "object-cover");
      }
    };
    reader.readAsDataURL(input.files![0]);
  }

  async function handleUpdateUser(dataUpdate: IFormEditAccountUser) {
    setIsLoading(true);

    try {
      const resp = await api.patch("/users/", dataUpdate);
      toast.success("Alterações feitas");
      setUser(resp.data);
      handleUpdateAvatarUser();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateAvatarUser() {
    const avatar = handleGetAvatar();

    if (avatar) {
      try {
        const resp = await api.patch("/users/avatar", avatar);
        setUser(resp.data);
      } catch (error) {}
    }
  }

  function handleGetAvatar() {
    if (!inputAvatarRef.current?.files?.length) return;
    const formData = new FormData();

    const avatar = inputAvatarRef.current?.files![0];
    formData.append("avatar", avatar!);

    return formData;
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

      <label className="m-8 mx-auto w-24 h-24 bg-gray7 flex items-center justify-center overflow-hidden rounded-full cursor-pointer">
        <Image
          src={user?.avatarUrl || "/add-photo.svg"}
          ref={tagImgRef}
          width={100}
          height={100}
          loading="lazy"
          alt="Adicione uma foto de perfil"
          className={`${!user?.avatarUrl && "w-9 h-9"}`}
        />
        <input
          ref={inputAvatarRef}
          type="file"
          name="avatar"
          onChange={handleFileAvatar}
          className="hidden"
        />
      </label>

      <FormLabel htmlFor="firstName">Nome</FormLabel>
      <FormInput
        id="firstName"
        defaultValue={user?.firstName}
        register={register("firstName")}
      />
      {errors.firstName?.message && (
        <FormErrorText>{errors.firstName.message}</FormErrorText>
      )}

      <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
      <FormInput
        id="lastName"
        defaultValue={user?.lastName}
        register={register("lastName")}
      />
      {errors.lastName?.message && (
        <FormErrorText>{errors.lastName.message}</FormErrorText>
      )}

      <FormLabel htmlFor="email">Nome</FormLabel>
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
