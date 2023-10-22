import { ReactNode, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

interface IMenuHamb {
  children: ReactNode;
}

function MenuHamb({ children }: IMenuHamb) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        <button type="button" onClick={() => setIsOpenMenu(!isOpenMenu)}>
          {isOpenMenu ? <IoClose size={26} /> : <IoMenu size={26} />}
        </button>
      </div>

      {isOpenMenu && (
        <>
          <div className="absolute top-[4.375rem] left-0 w-full bg-white">
            {children}
          </div>
          <div
            onClick={() => setIsOpenMenu(false)}
            className="fixed top-0 left-0 w-full h-full bg-black/5 -z-30"
          />
        </>
      )}
    </>
  );
}

export default MenuHamb;
