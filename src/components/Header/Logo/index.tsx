import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="py-3">
      <Link href="/">
        <Image
          src="/logo-mobile.svg"
          alt="Logo HomeHub"
          width={54}
          height={45}
          className="lg:hidden"
        />
        <Image
          src="/logo-desktop.svg"
          alt="Logo HomeHub"
          width={142}
          height={45}
          className="hidden lg:block"
        />
      </Link>
    </div>
  );
}

export default Logo;
