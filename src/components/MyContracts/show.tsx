import React from "react";
import { IContract, useContractsStore } from "@/stores/contracts";
import { BoxContract } from "../Contracts/components/box-contract";
import useUserStore from "@/stores/user";

function MyContractsShow() {
  const [myContracts, setMyContracts] = React.useState<IContract[] | null>(
    null
  );

  const { getTenantContracts } = useContractsStore();
  const { user } = useUserStore();

  const getTenantContractsInDb = React.useCallback(async () => {
    const contractList = await getTenantContracts(String(user?.id));

    setMyContracts(contractList);
  }, [getTenantContracts, user?.id]);

  React.useEffect(() => {
    getTenantContractsInDb();
  }, [getTenantContractsInDb]);

  return (
    <section className="px-14">
      <div className="mt-6">
        <span className="text-2xl font-bold">Contratos</span>

        <div className="grid grid-cols-3 2xl:grid-cols-5 gap-4">
          {myContracts &&
            myContracts.map((contract) => {
              return <BoxContract key={contract.id} contract={contract} />;
            })}
        </div>
      </div>
    </section>
  );
}

export default MyContractsShow;
