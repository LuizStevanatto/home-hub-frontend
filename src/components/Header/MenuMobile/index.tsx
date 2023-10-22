import MenuHamb from "@/components/MenuHamb";
import Link from "next/link";

function MenuMobile() {
  return (
    <MenuHamb>
      <nav>
        <Link href="/login" className="block px-2 py-3  hover:bg-gray7">
          Fazer login
        </Link>
        <Link href="/register" className="block px-2 py-3  hover:bg-gray7">
          Criar conta
        </Link>
      </nav>
    </MenuHamb>
  );
}

export default MenuMobile;
