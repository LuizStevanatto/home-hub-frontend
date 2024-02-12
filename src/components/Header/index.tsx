import MenuMobile from "./MenuMobile";
import MenuDesktop from "./MenuDesktop";
import Logo from "./Logo";
import User from "./User";
import useUserStore from "@/stores/user";

function Header() {
  const { user } = useUserStore();

  return (
    <header className="px-4 h-[69px] flex items-center justify-between sticky top-0 left-0 right-0 z-20 bg-white border-b border-gray5 text-gray2 font-medium lg:px-9">
      <Logo />

      {!user?.id && (
        <>
          <MenuMobile />
          <MenuDesktop />
        </>
      )}

      {user?.id && <User />}
    </header>
  );
}

export default Header;
