import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import useUserStore from "@/stores/user";
import UsermMenuMobile from "./UserMenuMobile";
import UserMenuDesktop from "./UserMenuDesktop";
import { useRouter } from "next/router";

function User() {
  const { user, signOut } = useUserStore();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  function handleOpenCloseMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  const getInitialLetters = () => {
    let initialLetters = "";
    const getNames = user?.name.toUpperCase().split(" ");

    if (getNames && getNames.length === 1) {
      initialLetters = getNames[0][0];
    } else if (getNames && getNames.length >= 2) {
      initialLetters = getNames[0][0] + getNames[1][0];
    }

    return initialLetters;
  };

  const handleLogout = async () => {
    await signOut();

    await router.push("/login");
  };

  return (
    <>
      <div className="sm:hidden">
        <UsermMenuMobile handleLogout={handleLogout} />
      </div>

      <div className="hidden sm:flex items-center gap-4 cursor-default relative">
        <div className="w-10 h-10 rounded-full bg-brand1 text-base text-white font-medium flex items-center justify-center overflow-hidden">
          <>{getInitialLetters()}</>
        </div>

        <div
          className="text-gray1 flex items-center gap-2 cursor-pointer"
          onClick={handleOpenCloseMenu}
        >
          <p className="hidden sm:block">{user?.name}</p>
          <span className="text-xl text-gray1 px-1">
            {!isOpenMenu ? <MdExpandMore /> : <MdExpandLess />}
          </span>
        </div>

        {isOpenMenu && (
          <UserMenuDesktop
            handleCloseUserMenu={handleOpenCloseMenu}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </>
  );
}

export default User;
