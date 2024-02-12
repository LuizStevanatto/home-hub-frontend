import { BiFilterAlt } from "react-icons/bi";
import Container from "../Conateiner";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "../Button";
import { Dispatch, SetStateAction } from "react";
import PropertyType from "./PropertyType";
import IsSale from "./IsSale";
import IsInCondo from "./IsInCondo";
import PropertyDetails from "./PropertyDetails";
import useFilterProperties from "@/contexts/FIlterContext/hook";
import { IProperty } from "@/stores/property";

interface IFilterProperties {
  setProperties: Dispatch<SetStateAction<[] | IProperty[]>>;
}

function FilterProperties({ setProperties }: IFilterProperties) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { newPropertiesFiltered } = useFilterProperties();

  function handlePropertiesShow() {
    setProperties(newPropertiesFiltered);
    onClose();
  }

  return (
    <>
      <Container>
        <section className="mt-9 mb-6 flex items-center justify-between">
          <h2 className="text-xl text-gray1 font-semibold">
            Anúncios recentes
          </h2>
          <button
            type="button"
            onClick={onOpen}
            className="p-4  text-sm text-gray3 font-medium border border-gray5 rounded-lg flex items-center gap-2"
          >
            <BiFilterAlt size={18} />
            Filtros
          </button>
        </section>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>Filtros</h2>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => e.preventDefault()}>
              <IsSale />
              <IsInCondo />
              <PropertyType />
              <PropertyDetails />

              <Button
                type="submit"
                onClick={handlePropertiesShow}
                className="max-w-max p-6 ml-auto"
              >
                Mostrar ({newPropertiesFiltered.length}){" "}
                {newPropertiesFiltered.length == 1 ? "imóvel" : "imóveis"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FilterProperties;
