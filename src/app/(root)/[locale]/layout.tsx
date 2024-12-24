import { Navbar } from "@/modules/core/components/navbar/Navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default layout;
