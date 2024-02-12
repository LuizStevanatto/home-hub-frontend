import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import useMyAdsListProperties from "@/contexts/MyAdsListPropertiesContext/hook";
import { IProperty } from "@/stores/property";

interface IModalDisableProperty {
  property: IProperty;
}

function ModalDisableProperty({ property }: IModalDisableProperty) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id, isAvailable } = property;

  return (
    <>
      <div onClick={onOpen} className="flex items-center gap-1">
        <Switch isChecked={isAvailable} />
        <span>{isAvailable ? "Ativado" : "Desativado"}</span>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>{!isAvailable ? "Desativar" : "Ativar"} anúncio</h2>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <p className="text-gray1 font-medium">
              Tem certa que deseja desativar seu anúncio?
            </p>
            <p className="mt-3 text-gray2 font-normal leading-normal">
              {!isAvailable
                ? "Seu anúncio não será mais exibido nas pesquisas até que você ative ele novamente."
                : "Seu anúncio irá voltar a ser exibido nas buscas novamente."}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDisableProperty;
