import Link from "next/link";

function MenuDesktop() {
  return (
    <nav className="hidden lg:flex items-center gap-4 border-l border-gray5 h-[4.3125rem] pl-4">
      <Link href="/login">Fazer login</Link>
      <Link
        href="/register"
        className="border border-gray5 px-6 py-2 rounded-lg"
      >
        Criar conta
      </Link>
    </nav>
  );
}

export default MenuDesktop;
