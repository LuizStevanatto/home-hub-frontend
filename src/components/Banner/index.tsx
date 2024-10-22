import { ReactNode } from "react";

interface IBanner {
  children: ReactNode;
}

function Banner({ children }: IBanner) {
  return (
    <section className="h-80 bg-[url('https://i.imgur.com/XqsDbfS.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="h-full w-full bg-gradient-to-t from-gray0/20 to-gray0/40 flex flex-col items-center justify-center gap-5">
        {children}
      </div>
    </section>
  );
}

export default Banner;
