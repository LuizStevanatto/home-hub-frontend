import { useEffect } from "react";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import useUserStore, { IUser } from "@/stores/user";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LayoutRoot } from "@/layout/root";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { signIn, user } = useUserStore();

  const accessToken = parseCookies()["@homeHub:user_token"];

  useEffect(() => {
    async function handleAutoLogin() {
      try {
        await signIn({
          email: String(user?.email),
          password: String(user?.password),
        });

        router.push("/");
      } catch (error) {
        console.log(error);

        router.push("/login");
      }
    }

    if (accessToken) {
      handleAutoLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signIn, accessToken, user?.email, user?.password]);

  return (
    <>
      <ChakraProvider>
        <LayoutRoot>
          <Component {...pageProps} />
        </LayoutRoot>
      </ChakraProvider>
      <ToastContainer autoClose={5000} position="top-center" />
    </>
  );
}
