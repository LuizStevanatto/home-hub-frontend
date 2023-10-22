import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { IProperty } from "@/pages";
import useMyAdsListProperties from "@/contexts/MyAdsListPropertiesContext/hook";

interface IModalDisableProperty {
  property: IProperty;
}

function ModalDisableProperty({ property }: IModalDisableProperty) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleDisableProperty, handleEnableProperty } =
    useMyAdsListProperties();

  const { id, isActive } = property;

  return (
    <>
      <div onClick={onOpen} className="flex items-center gap-1">
        <Switch isChecked={isActive} />
        <span>{isActive ? "Ativado" : "Desativado"}</span>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>{isActive ? "Desativar" : "Ativar"} anúncio</h2>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <p className="text-gray1 font-medium">
              Tem certa que deseja desativar seu anúncio?
            </p>
            <p className="mt-3 text-gray2 font-normal leading-normal">
              {isActive
                ? "Seu anúncio não será mais exibido nas pesquisas até que você ative ele novamente."
                : "Seu anúncio irá voltar a ser exibido nas buscas novamente."}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={onClose} mr={6}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={async () => {
                if (isActive) {
                  await handleDisableProperty(id);
                } else {
                  await handleEnableProperty(id);
                }
                onClose();
              }}
            >
              Sim, {isActive ? "Desativar" : "Ativar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDisableProperty;
