import { useEffect } from "react";
import { parseCookies } from "nookies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import api from "@/services/api";
import useUserStore, { IUser } from "@/stores/user";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LayoutRoot } from "@/layout/root";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { signIn } = useUserStore();

  const token = parseCookies()["@webcasas:user_token"];
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    async function handleAutoLogin() {
      try {
        const resp = await api.get("/sessions");
        const user: IUser = resp.data;
        await signIn({
          email: user.email,
          password: user.password,
        });
      } catch (error) {}
    }

    if (token) {
      handleAutoLogin();
    }
  }, []);

  return (
    <>
      {/* <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style> */}
      <ChakraProvider>
        <LayoutRoot>
          <Component {...pageProps} />
        </LayoutRoot>
      </ChakraProvider>
      <ToastContainer autoClose={1500} />
    </>
  );
}
