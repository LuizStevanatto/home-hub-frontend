import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useContractsStore } from "@/stores/contracts";
import Button from "@/components/Button";

interface IModalDeleteContract {
  contractId: string;
}
function ModalDeleteContract({ contractId }: IModalDeleteContract) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteContract } = useContractsStore();

  return (
    <>
      <Button
        type="button"
        className="bg-red-500 hover:bg-red-600 w-[378px]"
        onClick={onOpen}
      >
        Excluir Contrato
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>Excluir Contrato</h2>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <p className="text-gray1 font-medium">
              Tem certa que deseja excluir seu contrato?
            </p>
            <p className="mt-3 text-gray2 font-normal leading-normal">
              Seu contrato será excluido permanentemente e não será possível
              recupera-lo.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={onClose}
              className="mr-6 bg-red-500 hover:bg-red-600"
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-700 hover:bg-blue-800"
              type="button"
              onClick={async () => {
                await deleteContract(contractId);
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

export default ModalDeleteContract;
