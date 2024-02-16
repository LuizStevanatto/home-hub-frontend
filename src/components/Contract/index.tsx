import { IContract, useContractsStore } from "@/stores/contracts";
import React from "react";

function ShowContracts() {
  const [contracts, setContracts] = React.useState<IContract[] | null>(null);
  const { getContracts } = useContractsStore();

  const getContractsInDb = React.useCallback(async () => {
    const get = await getContracts();

    setContracts(get);
  }, [getContracts]);

  React.useEffect(() => {
    getContractsInDb();
  }, [getContractsInDb]);

  return (
    <section className="p-16">
      <span className="text-2xl font-bold">Contratos</span>

      <div className="grid grid-cols-5 gap-4">
        {contracts &&
          contracts.map((contract) => {
            return (
              <div
                key={contract.id}
                className="flex flex-col  w-[330px] h-[250px] bg-neutral-300 rounded-md mt-8 p-4"
              >
                <span className="text-xl font-bold">
                  Informações do Contrato
                </span>

                <div className="text-left mt-4 flex flex-col">
                  <span>
                    Data de Início -{" "}
                    {`${contract.startDate}` === undefined
                      ? `${contract.startDate}`
                      : "Não informado"}
                  </span>
                  <span>
                    Data de término -{" "}
                    {`${contract.endDate}` === undefined
                      ? `${contract.endDate}`
                      : "Não informado"}
                  </span>
                  <span>
                    Situação do Contrato -{" "}
                    {`${contract.isActive}` === undefined
                      ? `${contract.isActive}`
                      : "Não informado"}
                  </span>
                  <span>
                    Valor do contrato -{" "}
                    {`${contract.price}` !== undefined
                      ? `${contract.price}`
                      : "Não informado"}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default ShowContracts;
