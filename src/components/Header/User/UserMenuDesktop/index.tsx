import Link from "next/link";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { RxExit } from "react-icons/rx";
import { FaFileContract } from "react-icons/fa";
import { BsHouseAdd } from "react-icons/bs";
import useUserStore from "@/stores/user";

interface IUserMenuDesktop {
  handleCloseUserMenu: () => void;
  handleLogout: () => void;
}

function UserMenuDesktop({
  handleCloseUserMenu,
  handleLogout,
}: IUserMenuDesktop) {
  const { user } = useUserStore();

  return (
    <>
      <div
        className="w-full h-full bg-black/5 fixed top-0 left-0 right-0 bottom-0"
        onClick={handleCloseUserMenu}
      />

      <nav className="text-sm text-gray2 flex flex-col  bg-white absolute top-[3.2rem] right-0 rounded-b-lg overflow-hidden w-full ">
        <Link
          href="/my-register"
          className="py-3 px-4 hover:bg-gray7 flex items-center gap-3"
        >
          <HiOutlineClipboardDocumentList size={18} />
          Meu cadastro
        </Link>

        {user?.isAdmin && (
          <>
            <Link
              href="/my-ads"
              className="py-3 px-4 hover:bg-gray7 flex items-center gap-3"
            >
              <HiOutlineSquares2X2 size={18} />
              Meus Anúncios
            </Link>

            <Link
              href="/form-property"
              className="py-3 px-4 hover:bg-gray7 flex items-center gap-3"
            >
              <BsHouseAdd size={18} />
              Anunciar
            </Link>
          </>
        )}

        <Link
          href="/contracts"
          className="py-3 px-4 hover:bg-gray7 flex items-center gap-3"
        >
          <FaFileContract size={18} />
          Contratos
        </Link>

        <Link
          href="/contracts/my-contracts"
          className="py-3 px-4 hover:bg-gray7 flex items-center gap-3"
        >
          <FaFileContract size={18} />
          Meus Contratos
        </Link>

        <button
          type="button"
          className="py-3 px-4 hover:bg-gray7 flex items-center gap-3"
          onClick={handleLogout}
        >
          <RxExit size={18} />
          Sair
        </button>
      </nav>
    </>
  );
}

export default UserMenuDesktop;
