import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Options from "./Options";

function ManagementAccountUser() {
  const [isExpand, setIsExpand] = useState(false);

  function handleOpenCloseExpand() {
    setIsExpand(!isExpand);
  }

  return (
    <div className="max-w-lg w-full mx-auto p-9 border border-gray5 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FiAlertTriangle size={44} className="text-alert1" />
          <h2 className="text-xl text-gray1 font-bold">Gerencie sua conta</h2>
        </div>
        <button
          type="button"
          onClick={handleOpenCloseExpand}
          className="text-3xl text-brand1"
        >
          {isExpand ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>

      <p className="text-gray2 mt-3">
        Você poderá desativar ou excluir sua conta. Seus dados, suas decisões,
        nós não opinamos
      </p>

      {isExpand && <Options />}
    </div>
  );
}

export default ManagementAccountUser;
