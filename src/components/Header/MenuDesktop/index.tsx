import useUserStore from "@/stores/user";
import Link from "next/link";

function MenuDesktop() {
  const { user } = useUserStore();

  return (
    <nav className="hidden lg:flex border-l border-gray5 h-[4.3125rem] pl-4 gap-4">
      {!user && (
        <div className="flex items-center gap-4">
          <Link href="/login">Fazer login</Link>
          <Link
            href="/register"
            className="border border-gray5 px-6 py-2 rounded-lg"
          >
            Criar conta
          </Link>
        </div>
      )}
    </nav>
  );
}

export default MenuDesktop;
