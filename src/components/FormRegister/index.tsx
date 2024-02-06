import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Button from "../Button";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import FormLabel from "../Form/FormLabel";
import FormTitle from "../Form/FormTitle";
import formRegisterSchema from "@/schemas/formRegisterSchema";
import FormErrorText from "../Form/FormErrorText";
import useUserStore from "@/stores/user";
import { toast } from "react-toastify";
import { z } from "zod";

type IFormRegister = z.infer<typeof formRegisterSchema>;

function FormRegister() {
  const { signUp, signIn } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormRegister>({
    resolver: zodResolver(formRegisterSchema),
  });

  async function handleRegister(data: IFormRegister) {
    setIsLoading(true);

    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      toast.success("Conta criada");

      await signIn({
        email: data.email,
        password: data.password,
      });

      await router.replace("/");
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const msgErrorForCompare = "Email already registered";
        const msgAxios = error.response?.data.message;

        if (msgAxios == msgErrorForCompare) {
          setIsEmailRegistered(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleRegister)} className="mt-[2%]">
      <FormTitle className="mb-8">Cadastro</FormTitle>

      <FormLabel htmlFor="name">Nome</FormLabel>
      <FormInput
        type="text"
        id="name"
        placeholder="Informe seu nome"
        register={register("name")}
      />
      {errors.name && (
        <FormErrorText className="mt-2">{errors.name.message}</FormErrorText>
      )}

      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Informe seu email"
        register={register("email")}
      />
      {errors.email && (
        <FormErrorText className="mt-2">{errors.email.message}</FormErrorText>
      )}
      {isEmailRegistered && (
        <FormErrorText className="mt-2">
          Email já cadastrado, tente outro
        </FormErrorText>
      )}

      <FormLabel htmlFor="password">Senha</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Informe sua senha"
        register={register("password")}
      />
      {errors.password && (
        <FormErrorText className="mt-2">
          {errors.password.message}
        </FormErrorText>
      )}

      <FormLabel htmlFor="confirmPassword">Confirme sua senha</FormLabel>
      <FormInput
        type="password"
        id="confirmPassword"
        placeholder="Informe novamente sua senha"
        register={register("confirm_password")}
      />
      {errors.confirm_password && (
        <FormErrorText className="mt-2">
          {errors.confirm_password.message}
        </FormErrorText>
      )}

      <Button type="submit" className="mt-9" disabled={isLoading}>
        Finalizar Cadastro
      </Button>

      <p className="mt-9 text-sm text-center text-gray1 font-medium ">
        Já possui conta?{" "}
        <Link href="/login" className="text-brand1">
          Fazer Login
        </Link>
      </p>
    </Form>
  );
}

export default FormRegister;
