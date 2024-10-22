import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Header from "@/components/Header";
import api from "@/services/api";
import { destroyCookie } from "nookies";
import { useState } from "react";
import Head from "next/head";

function ActiveAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const userId = router.query.id;

  async function handleActiveAccount() {
    setIsLoading(true);

    try {
      await api.patch(`/users/activate/${userId}`);
      toast.success("Conta ativada");
      destroyCookie(null, "@homeHub:is_activation_user");
      router.replace("/login");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Ativar conta</title>
      </Head>
      <Header />
      <div className="h-[calc(100vh-4.375rem)] flex items-center justify-center">
        <div className="p-9 max-w-lg flex-grow border border-gray5 rounded-lg">
          <h2 className="text-xl text-gray1 font-bold">Ativar conta</h2>
          <p className="mt-2 mb-4">Sua conta será ativada, deseja continuar?</p>
          <Button
            type="button"
            onClick={handleActiveAccount}
            disabled={isLoading}
          >
            Ativar conta
          </Button>
        </div>
      </div>
    </>
  );
}

export default ActiveAccount;
