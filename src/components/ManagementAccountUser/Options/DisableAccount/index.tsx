import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";
import api from "@/services/api";
import useUserStore from "@/stores/user";

function DisableAccountUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  async function handleDisableAccount() {
    try {
      await api.patch("/users/deactivate");
      toast.success("Conta desativada");
      destroyCookie(null, "@homeHub:user_token");
      router.replace("/");
    } catch (error) {}
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray1 font-medium">
            Desativar conta temporariamnte
          </p>
          <button onClick={onOpen} className="text-brand1 font-normal">
            desativar
          </button>
        </div>
        <div className="text-sm text-gray2 font-normal leading-normal mt-2">
          <p>Seu perfil será desabilitado e seus anúncios serão pausados.</p>
          <p>Você poderá reativar sua conta quando quiser.</p>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Desativar conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-gray1 font-medium">
              Tem certa que deseja desativar sua conta ?
            </p>
            <p className="mt-3 text-gray2 font-normal">
              Você poderá reativar sua conta a qualquer momento, mas seus
              anúncios continuaram pausados até você ativalos novamente.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={onClose} mr={"6"}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleDisableAccount}>
              Desativar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DisableAccountUser;
