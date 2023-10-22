import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import useUserStore from "@/stores/user";
import UsermMenuMobile from "./UserMenuMobile";
import UserMenuDesktop from "./UserMenuDesktop";
import Image from "next/image";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

function User() {
  const { user, setUser } = useUserStore();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  function handleOpenCloseMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  function handleLogout() {
    destroyCookie(null, "@webcasas:user_token");
    setUser(null);
    router.replace("/");
  }

  return (
    <>
      <div className="sm:hidden">
        <UsermMenuMobile handleLogout={handleLogout} />
      </div>

      <div className="hidden sm:flex items-center gap-4 cursor-default relative">
        <div className="w-10 h-10 rounded-full bg-brand1 text-base text-white font-medium flex items-center justify-center overflow-hidden">
          {user?.avatarUrl ? (
            <Image
              src={user?.avatarUrl}
              width={100}
              height={200}
              alt={`${user.firstName} ${user.lastName}`}
              className="object-cover"
            />
          ) : (
            <>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </>
          )}
        </div>

        <div
          className="text-gray1 flex items-center gap-2 cursor-pointer"
          onClick={handleOpenCloseMenu}
        >
          <p className="hidden sm:block">
            {user?.firstName} {user?.lastName}
          </p>
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
