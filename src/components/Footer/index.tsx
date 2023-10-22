import Image from "next/image";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import Link from "next/link";
import Container from "../Conateiner";
import { MdExpandLess } from "react-icons/md";

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  function handleScrollForTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-32 h-32 bg-gray0">
      <Container className="h-full flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-mobile-white.svg"
            alt="Logo WebCasas"
            width={54}
            height={45}
            className="lg:hidden"
          />
          <Image
            src="/logo-desktop-white.svg"
            alt="Logo WebCasas"
            width={142}
            height={45}
            className="hidden lg:block"
          />
        </Link>

        <div className="text-brand4 flex flex-col items-center gap-3">
          <p className="text-sm font-semibold">
            &copy; {currentYear} - webcasas
          </p>
          <div className="text-xl flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/in/steinerstt/"
              target="_blank"
            >
              <TbBrandLinkedin />
            </Link>
            <Link href="https://github.com/steinerstt" target="_blank">
              <TbBrandGithub />
            </Link>
          </div>
        </div>

        <button
          onClick={handleScrollForTop}
          className="h-11 w-11 text-lg text-white bg-gray1 rounded-lg flex items-center justify-center"
        >
          <MdExpandLess />
        </button>
      </Container>
    </footer>
  );
}

export default Footer;
