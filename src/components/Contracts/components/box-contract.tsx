import Button from "@/components/Button";
import { IContract } from "@/stores/contracts";
import { useRouter } from "next/router";
import React from "react";
import { dateFormat } from "@/utils/date-format";
import useUserStore from "@/stores/user";

type BoxContractProps = {
  contract: IContract;
};

export function BoxContract(props: BoxContractProps) {
  const { contract } = props;
  const { user } = useUserStore();

  const router = useRouter();
  const userId = String(user?.id);

  const priceFormat = contract.price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  return (
    <div
      key={contract.id}
      className="flex flex-col gap-2 w-[330px] h-[250px] bg-neutral-300 rounded-md mt-8 p-4"
    >
      <span className="text-xl font-bold">Informações do Contrato</span>

      <div className="text-left mt-4 flex flex-col">
        <span>
          Data de Início -{" "}
          <strong>
            {contract.startDate !== undefined
              ? `${dateFormat(contract.startDate)}`
              : "Não informado"}
          </strong>
        </span>

        <span>
          Data de término -{" "}
          <strong>
            {contract.endDate !== undefined
              ? `${dateFormat(contract.endDate)}`
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

      {userId === contract.ownerId && (
        <Button
          className="mt-6 h-9"
          onClick={() => router.push(`/contracts/edit-contract/${contract.id}`)}
        >
          Editar contrato
        </Button>
      )}
    </div>
  );
}
