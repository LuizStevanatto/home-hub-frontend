import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

type LayoutRootProps = React.ComponentProps<"main">;

export function LayoutRoot(props: LayoutRootProps) {
  const { children } = props;

  return (
    <main className="w-screen">
      <Header />
      <div className="h-[calc(100vh-197px)]">{children}</div>
      <Footer />
    </main>
  );
}
