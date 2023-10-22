import { useState } from "react";
import Link from "next/link";
import { setCookie } from "nookies";
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
import api from "@/services/api";
import useUserStore from "@/stores/user";
import { ILoginResponse } from "../FormLogin";
import { toast } from "react-toastify";

interface IFormRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function FormRegister() {
  const { setUser } = useUserStore();
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

  async function handleRegister(dataRegister: IFormRegister) {
    setIsLoading(true);

    try {
      await api.post("/users", dataRegister);
      toast.success("Conta criada");
      handleLogin(dataRegister.email, dataRegister.password);
    } catch (error) {
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

  async function handleLogin(email: string, password: string) {
    setIsLoading(true);

    try {
      const resp = await api.post("/sessions", { email, password });
      const { token, user }: ILoginResponse = resp.data;
      setCookie(null, "@webcasas:user_token", token, {
        maxAge: 86400,
        path: "/",
      });
      setUser(user);
      router.replace("/");
    } catch (error) {
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleRegister)} className="mt-[2%]">
      <FormTitle className="mb-8">Cadastro</FormTitle>

      <FormLabel htmlFor="firstName">Nome</FormLabel>
      <FormInput
        type="text"
        id="firstName"
        placeholder="Informe seu nome"
        register={register("firstName")}
      />
      {errors.firstName && (
        <FormErrorText className="mt-2">
          {errors.firstName.message}
        </FormErrorText>
      )}

      <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
      <FormInput
        type="text"
        id="lastName"
        placeholder="Informe seu sobrenome"
        register={register("lastName")}
      />
      {errors.lastName && (
        <FormErrorText className="mt-2">
          {errors.lastName.message}
        </FormErrorText>
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
        register={register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <FormErrorText className="mt-2">
          {errors.confirmPassword.message}
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
