import Button from "@/components/Button";
import useUserStore from "@/stores/user";
import Link from "next/link";
import { useRouter } from "next/router";

function MenuDesktop() {
  const router = useRouter();
  const { user, signOut } = useUserStore();

  async function handleSignOut() {
    await signOut();

    router.push("/login");
  }

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

      {/* criar botão de sair */}
      {/* criar botão de criar nova propriedade.
          OBS: Precisa estar logado e ser admin

          property: is_admin
      */}
      {/* {user && ( */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSignOut} className="text-sm px-4">
          Sair
        </Button>
        <Button
          onClick={() => router.push("/form-property")}
          className="text-sm px-4"
        >
          Nova propriedade
        </Button>
      </div>
      {/* )} */}
    </nav>
  );
}

export default MenuDesktop;
