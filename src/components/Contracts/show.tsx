import React from "react";
import { IContract, useContractsStore } from "@/stores/contracts";
import { BoxContract } from "./components/box-contract";

function ShowContracts() {
  const [contracts, setContracts] = React.useState<IContract[] | null>(null);
  const [activeContracts, setActiveContracts] = React.useState<
    IContract[] | null
  >(null);
  const { getContracts, getActiveContracts } = useContractsStore();

  const getContractsInDb = React.useCallback(async () => {
    const contractList = await getContracts();
    const activeContractList = await getActiveContracts();

    setContracts(contractList);
    setActiveContracts(activeContractList);
  }, [getActiveContracts, getContracts]);

  React.useEffect(() => {
    getContractsInDb();
  }, [getContractsInDb]);

  return (
    <section className="px-14">
      <div className="mt-6">
        <span className="text-2xl font-bold">Contratos</span>

        <div className="grid grid-cols-3 2xl:grid-cols-5 gap-4">
          {contracts &&
            contracts.map((contract) => {
              return <BoxContract key={contract.id} contract={contract} />;
            })}
        </div>
      </div>

      <div className="mt-6">
        <span className="text-2xl font-bold">Contratos Ativos</span>

        <div className="grid grid-cols-3 2xl:grid-cols-5 gap-4">
          {activeContracts &&
            activeContracts.map((contract) => {
              return <BoxContract key={contract.id} contract={contract} />;
            })}
        </div>
      </div>
    </section>
  );
}

export default ShowContracts;
