import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useUserStore from "@/stores/user";
import FormLabel from "@/components/Form/FormLabel";
import FormInput from "@/components/Form/FormInput";
import formDeleteAccountUserSchema from "@/schemas/formDeleteAccountUser";
import FormErrorText from "@/components/Form/FormErrorText";
import api from "@/services/api";

interface IFormDeleteAccount {
  password: string;
}

function DeleteAccount() {
  const { deleteUser, user } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPasswordinvalid, setIsPasswordInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormDeleteAccount>({
    resolver: zodResolver(formDeleteAccountUserSchema),
  });
  const router = useRouter();

  async function handleDeleteAccount(dataDeleteAccount: IFormDeleteAccount) {
    setIsLoading(true);

    try {
      const response = await api.delete("/users", { data: dataDeleteAccount });

      if (response.status === 200) {
        await deleteUser(String(user?.id));

        toast.success("Conta excluida");
        router.replace("/login");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const msgForPasswordInvalid = "Password invalid";
        const msgAxios = error.response?.data.message;

        if (msgAxios == msgForPasswordInvalid) {
          setIsPasswordInvalid(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray1 font-medium">
            Excluir conta permanentemente
          </p>
          <button onClick={onOpen} className="text-brand1 font-normal">
            excluir
          </button>
        </div>
        <p className="text-sm text-gray2 font-normal leading-normal mt-2">
          Dados da sua conta e anúncios serão excluídos definitivamente. Não
          será possível recuperar sua conta.
        </p>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-gray1 font-medium">
              Tem certa que deseja excluir sua conta?
            </p>
            <p className="mt-3 text-gray2 font-normal">
              Todos os seus dados e anúncios serão excluidos permanentemente,
              não sendo possível recuperalos.
            </p>

            <form onSubmit={handleSubmit(handleDeleteAccount)}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormInput
                type="password"
                id="password"
                placeholder="Informe sua senha"
                register={register("password")}
              />
              {errors.password && (
                <FormErrorText>{errors.password.message}</FormErrorText>
              )}
              {isPasswordinvalid && (
                <FormErrorText>Senha incorreta</FormErrorText>
              )}

              <div className="mt-9 flex gap-6 items-center justify-end">
                <Button type="button" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Excluir
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteAccount;
