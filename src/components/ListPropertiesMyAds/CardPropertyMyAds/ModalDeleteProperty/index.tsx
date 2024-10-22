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
import { BsTrash } from "react-icons/bs";
import { usePropertyStore } from "@/stores/property";

interface IModalDeleteProperty {
  propertyId: string;
}
function ModalDeleteProperty({ propertyId }: IModalDeleteProperty) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProperty } = usePropertyStore();

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center gap-[0.125rem]"
      >
        <BsTrash size={16} /> Excluir
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>Excluir anúncio</h2>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <p className="text-gray1 font-medium">
              Tem certa que deseja excluir seu anúncio?
            </p>
            <p className="mt-3 text-gray2 font-normal leading-normal">
              Seu anúncio será excluido permanentemente, não será possível
              recupera-lo.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={onClose} mr={6}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await deleteProperty(propertyId);
                onClose();
              }}
            >
              Sim, excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDeleteProperty;
