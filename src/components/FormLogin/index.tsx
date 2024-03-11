import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "nookies";
import Link from "next/link";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import useUserStore from "@/stores/user";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import FormTitle from "../Form/FormTitle";
import Button from "../Button";
import FormErrorText from "../Form/FormErrorText";
import FormLabel from "../Form/FormLabel";
import formLoginSchema from "@/schemas/formLoginSchema";

interface IFormLogin {
  email: string;
  password: string;
}

function FormLogin() {
  const { signIn } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: zodResolver(formLoginSchema),
  });

  async function handleLogin(data: IFormLogin) {
    setIsLoading(true);

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });

      toast.success("Login efetuado");
      router.replace("/");
    } catch (error) {
      if (isAxiosError(error)) {
        const msgErrorForCompare = "Email or password invalid";
        const msgErrorAccountDesable = "User account desabled";
        const msgAxios = error.response?.data.message;
        if (msgAxios == msgErrorForCompare) {
          setIsLoginIncorrect(true);
        } else if (msgAxios == msgErrorAccountDesable) {
          const { user } = error.response?.data;
          setCookie(null, "@homeHub:is_activation_user", "true");
          router.replace(`/active-account/${user.id}`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleLogin)} className="mt-[6%]">
      <FormTitle className="mb-8">Login</FormTitle>

      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Informe seu email"
        register={register("email")}
      />
      {errors.email?.message && (
        <FormErrorText className="mt-2">{errors.email.message}</FormErrorText>
      )}
      <FormLabel htmlFor="password">Senha</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Informe sua senha"
        register={register("password")}
      />
      {errors.password?.message && (
        <FormErrorText className="mt-2">
          {errors.password.message}
        </FormErrorText>
      )}

      <Link
        href="/recovery-password"
        className="block mt-2 text-sm sm:w-[378px] text-right text-gray2"
      >
        Esqueceu a senha?
      </Link>

      {isLoginIncorrect && (
        <FormErrorText className="mt-6 mb-9 text-center">
          Email ou senha inválidos
        </FormErrorText>
      )}

      <Button type="submit" className="mt-9 sm:w-[378px]" disabled={isLoading}>
        Fazer Login
      </Button>

      <p className="mt-9 text-sm text-center sm:w-[378px] text-gray1 font-medium ">
        Ainda não possui conta?{" "}
        <Link href="/register" className="text-brand1">
          Fazer Cadastro
        </Link>
      </p>
    </Form>
  );
}

export default FormLogin;
