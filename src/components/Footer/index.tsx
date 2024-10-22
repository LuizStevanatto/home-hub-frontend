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
    <footer className="bg-gray0 mt-auto">
      <Container className="h-[128px] flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-mobile-white.svg"
            alt="Logo HomeHub"
            width={54}
            height={45}
            className="lg:hidden"
          />
          <Image
            src="/logo-desktop-white.svg"
            alt="Logo HomeHub"
            width={142}
            height={45}
            className="hidden lg:block"
          />
        </Link>

        <div className="text-brand4 flex flex-col items-center gap-3">
          <p className="text-sm font-semibold">
            &copy; {currentYear} - HomeHub
          </p>
          <div className="text-xl flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/in/jonathan-kopezky-666a4b72/"
              target="_blank"
            >
              <TbBrandLinkedin />
            </Link>
            <Link href="https://www.linkedin.com/in/luiz-stevanatto-neto-882899193/" 
              target="_blank">
              <TbBrandLinkedin />
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
