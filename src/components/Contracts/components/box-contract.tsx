import Button from "@/components/Button";
import { IContract } from "@/stores/contracts";
import { useRouter } from "next/router";

type BoxContractProps = {
  contract: IContract;
};

export function BoxContract(props: BoxContractProps) {
  const { contract } = props;

  const router = useRouter();

  const priceFormat = contract.price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  return (
    <div
      key={contract.id}
      className="flex flex-col  w-[330px] h-[250px] bg-neutral-300 rounded-md mt-8 p-4"
    >
      <span className="text-xl font-bold">Informações do Contrato</span>

      <div className="text-left mt-4 flex flex-col">
        <span>
          Data de Início -{" "}
          <strong>
            {contract.startDate !== undefined
              ? contract.startDate
              : "Não informado"}
          </strong>
        </span>

        <span>
          Data de término -{" "}
          <strong>
            {contract.endDate !== undefined
              ? contract.endDate
              : "Não informado"}
          </strong>
        </span>

        <span>
          Situação do Contrato -{" "}
          <strong> {contract.isActive === true ? "Ativo" : "Não ativo"}</strong>
        </span>

        <span>
          Valor do contrato -{" "}
          <strong>
            {contract.price !== undefined ? priceFormat : "Não informado"}
          </strong>
        </span>
      </div>

      <Button
        className="mt-6 h-9"
        onClick={() => router.push(`/contracts/edit-contract/${contract.id}`)}
      >
        Editar contrato
      </Button>
    </div>
  );
}
